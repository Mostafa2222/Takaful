package com.takaful.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.takaful.entities.Card;
import com.takaful.entities.Customer;
import com.takaful.entities.CustomerCard;
import com.takaful.entities.Reward;
import com.takaful.jwt.WalletConfig;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GoogleWalletService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final WalletConfig walletConfig;
//    @Value("${wallet.issuer-id}")
//    private String ISSUER_ID;

    //private static final String CLASS_ID = ISSUER_ID + ".123456";

    private String clientEmail;
    private RSAPrivateKey privateKey;

    // 🔥 يتنفذ مرة واحدة بس
    @PostConstruct
    public void init() throws Exception {
        InputStream is = getClass().getClassLoader()
                .getResourceAsStream("service-account.json");

        if (is == null) {
            throw new RuntimeException("❌ service-account.json NOT FOUND in resources");
        }

        Map<String, Object> credentials = objectMapper.readValue(is, Map.class);

        clientEmail = (String) credentials.get("client_email");
        String privateKeyPem = (String) credentials.get("private_key");

        privateKey = getPrivateKey(privateKeyPem);
    }

    public void createWalletClass(Card card) throws Exception {

        String accessToken = getAccessToken();

        String classId = walletConfig.getIssuerId() + "." + card.getId();

        URL url = new URL("https://walletobjects.googleapis.com/walletobjects/v1/loyaltyClass");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer " + accessToken);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

//        String logoUrl = card.getDesign().getLogoUrl();
//        System.out.println("logoUrl: " + logoUrl);
        String json = """
    {
      "id": "%s",
      "issuerName": "WaterSplash",
      "programName": "%s",

      "programLogo": {
        "sourceUri": {
          "uri": "%s"
        }
      },
      "wideProgramLogo": {
                      "sourceUri": {
                        "uri": "%s"
                      }
                    },
      "heroImage": {
        "sourceUri": {
          "uri": "%s"
        }
      },
      "hexBackgroundColor": "%s",

      "reviewStatus": "UNDER_REVIEW"
    }
    """.formatted(
                classId,
                card.getDisplayName(),
                card.getDesign().getLogoUrl(),
                card.getDesign().getLogoInsideUrl(),
                card.getDesign().getStampBackgroundUrl(),
                card.getDesign().getPrimaryColor()
        );

        System.out.println("CLASS JSON: " + json);
        try (OutputStream os = conn.getOutputStream()) {
            os.write(json.getBytes());
        }

        int responseCode = conn.getResponseCode();

        if (responseCode != 200 && responseCode != 201) {
            throw new RuntimeException("Error creating class: " + responseCode);
        }
    }

    public boolean classExists(String classId) {
        try {
            String accessToken = getAccessToken();

            URL url = new URL(
                    "https://walletobjects.googleapis.com/walletobjects/v1/loyaltyClass/" + classId
            );

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            int code = conn.getResponseCode();

            return code == 200;

        } catch (Exception e) {
            return false;
        }
    }

    public void createWalletObject(String objectId, Customer customer, Card card,String qrCode) throws Exception {

        String accessToken = getAccessToken();

        String classId = walletConfig.getIssuerId() + "." + card.getId();

        URL url = new URL("https://walletobjects.googleapis.com/walletobjects/v1/loyaltyObject");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer " + accessToken);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String json = """
{
  "id": "%s",
  "classId": "%s",
  "state": "active",

  "accountId": "%s",
  "accountName": "%s",

  "barcode": {
    "type": "QR_CODE",
    "value": "%s"
  },
  "loyaltyPoints": {
     "balance": {
     "int": 0
      },
      "label": "Stamps"
    }
}
""".formatted(
                objectId,
                classId,
                customer.getId(),
                customer.getFullName(),
                qrCode
        );
        System.out.println("OBJECT JSON: " + json);
        try (OutputStream os = conn.getOutputStream()) {
            os.write(json.getBytes());
        }

        InputStream errorStream = conn.getErrorStream();
        if (errorStream != null) {
            String error = new String(errorStream.readAllBytes());
            System.out.println("ERROR BODY: " + error);
            throw new RuntimeException("Error creating object: " + error);
        }

//        if (responseCode != 200 && responseCode != 201) {
//            throw new RuntimeException("Error creating object: " + responseCode);
//        }
    }

    public String generateWalletLink(Customer customer, Card card, String qrCode) throws Exception {

        String objectId = walletConfig.getIssuerId() + "." + UUID.randomUUID();

        String classId = walletConfig.getIssuerId() + "." + card.getId();

        if (!classExists(classId)) {
            createWalletClass(card);
        }
        createWalletObject(objectId, customer, card, qrCode);

        Algorithm algorithm = Algorithm.RSA256(null, privateKey);

        String jwt = JWT.create()
                .withIssuer(clientEmail)
                .withAudience("google")
                .withClaim("typ", "savetowallet")
                .withClaim("payload", Map.of(
                        "loyaltyObjects", List.of(
                                Map.of("id", objectId,
                                        "classId", walletConfig.getIssuerId() + "." + card.getId())
                        )
                ))
                .sign(algorithm);

        return "https://pay.google.com/gp/v/save/" + jwt;
    }

    private RSAPrivateKey getPrivateKey(String privateKeyPem) throws Exception {

        String privateKeyContent = privateKeyPem
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replace("\\n", "")
                .replace("\n", "")
                .trim();
        System.out.println(privateKeyPem);
        byte[] decoded = Base64.getDecoder().decode(privateKeyContent);

        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decoded);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
    }

    public String getAccessToken() throws Exception {

        InputStream is = getClass().getClassLoader()
                .getResourceAsStream("service-account.json");

        GoogleCredentials credentials = GoogleCredentials
                .fromStream(is)
                .createScoped(List.of(
                        "https://www.googleapis.com/auth/wallet_object.issuer"
                ));

        credentials.refreshIfExpired();

        return credentials.getAccessToken().getTokenValue();
    }

    @Async
    public void updateWalletObject(CustomerCard cc) throws Exception {

        String accessToken = getAccessToken();

        URL url = new URL(
                "https://walletobjects.googleapis.com/walletobjects/v1/loyaltyObject/"
                        + cc.getWalletObjectId()
        );

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("X-HTTP-Method-Override", "PATCH");
        conn.setRequestProperty("Authorization", "Bearer " + accessToken);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        Reward reward = cc.getCard().getRewards()
                .stream()
                .min(Comparator.comparingInt(Reward::getRequiredStamps))
                .orElseThrow();

        int required = reward.getRequiredStamps();
        int stamps = cc.getStamps();
        int remaining = Math.max(0, required - stamps);

        String stars = buildStars(stamps);

        String message;

        if (stamps >= required) {
            message = "🎁 لديك غسيل مجاني!";
        } else if (remaining == 1) {
            message = "🔥 باقي ختم واحد وتحصل على هدية!";
        } else {
            message = "باقي " + remaining + " ختم";
        }

        String json = """
{
  "loyaltyPoints": {
    "balance": {
      "int": %d
    },
    "label": "Stamps"
  },
  "barcode": {
    "type": "QR_CODE",
    "value": "%s",
    "alternateText": "Scan me"
  },
  "textModulesData": [
    {
      "header": "Progress",
      "body": "%s\\n%d / %d"
    },
    {
      "header": "Status",
      "body": "%s"
    }
  ]
}
""".formatted(
                stamps,
                cc.getQrCode(),
                stars,
                stamps,
                required,
                message
        );

        try (OutputStream os = conn.getOutputStream()) {
            os.write(json.getBytes());
        }

        int responseCode = conn.getResponseCode();

        if (responseCode != 200) {
            throw new RuntimeException("Wallet update failed: " + responseCode);
        }
    }

    private String buildStars(int stamps) {
        int max = 5;

        StringBuilder stars = new StringBuilder();

        for (int i = 0; i < max; i++) {
            if (i < stamps) {
                stars.append("⭐");
            } else {
                stars.append("☆");
            }
        }

        return stars.toString();
    }
}