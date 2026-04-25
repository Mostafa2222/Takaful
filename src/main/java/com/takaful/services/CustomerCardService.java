package com.takaful.services;

import com.takaful.entities.*;
import com.takaful.jwt.WalletConfig;
import com.takaful.repositories.*;
import com.takaful.response.CustomerCardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerCardService {

    private final CustomerCardRepository repo;
    private final CustomerRepository customerRepo;
    private final CardRepository cardRepo;
    private final CardSettingsRepository cardSettingsRepo;
    private final TransactionRepository transactionRepo;
    private final RewardRepository rewardRepo;
    private final GoogleWalletService  googleWalletService;
    private final WalletConfig walletConfig;
//    @Value("${wallet.issuer-id}")
//    private String ISSUER_ID;
//    public CustomerCard assign(UUID customerId, Card card) {
//
//        CustomerCard cc = new CustomerCard();
//        cc.setCustomerId(customerId);
//        cc.setCard(card);
//        cc.setQrCode(UUID.randomUUID().toString());
//
//        return repo.save(cc);
//    }

    public CustomerCardResponse assign(Customer customer, Card card, String qr) throws Exception {

        //Card card = cardRepo.findById(req.getCardId()).orElseThrow();
        /*Customer customer = customerRepo.findById(req.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));*/
        repo.findByCustomerIdAndCardId(customer.getId(), card.getId())
                .ifPresent(cc -> {
                    throw new RuntimeException("Card already assigned");
                });

        //String qr = generateQr(req.getCustomerId());

        CustomerCard cc = CustomerCard.builder()
                .customer(customer)
                .card(card)
                .stamps(0)
                .points(0)
                .qrCode(qr)
                .build();

        String objectId = walletConfig.getIssuerId() + "." + UUID.randomUUID();
        cc.setWalletObjectId(objectId);
        repo.save(cc);
        googleWalletService.createWalletObject(
                objectId,
                customer,
                card,
                qr
        );
        return map(cc);
    }

    private String generateQr(UUID customerId) {
        return UUID.randomUUID() + "-WS-" + customerId;
    }

    private CustomerCardResponse map(CustomerCard cc) {
        return CustomerCardResponse.builder()
                .id(cc.getId())
                .customerId(cc.getCustomer().getId())
                .cardId(cc.getCard().getId())
                .stamps(cc.getStamps())
                .points(cc.getPoints())
                .qrCode(cc.getQrCode())
                .build();
    }

    public CustomerCard addStamp(String qr) {

        CustomerCard cc = repo.findByQrCode(qr).orElseThrow();

        cc.setStamps(cc.getStamps() + 1);
        cc.setLastStampAt(LocalDateTime.now());

        return repo.save(cc);
    }

    public CustomerCard addStamp(String qr, int stampsToAdd) {

        CustomerCard cc = repo.findByQrCode(qr).orElseThrow();

        CardSettings settings = cardSettingsRepo
                .findByCardId(cc.getCard().getId())
                .orElseThrow();

        // ❌ الكارت متوقف
        if (!settings.isActive()) {
            throw new RuntimeException("Card is disabled");
        }

        // ⛔ delay
        if (cc.getLastStampAt() != null) {

            long minutes = ChronoUnit.MINUTES.between(
                    cc.getLastStampAt(),
                    LocalDateTime.now()
            );

            if (minutes < settings.getStampDelayMinutes()) {
                throw new RuntimeException("Wait before next stamp");
            }
        }

        // ❌ multi stamp
        if (!settings.isAllowMultiStamps() && stampsToAdd > 1) {
            throw new RuntimeException("Only one stamp allowed");
        }

        // ✅ add stamp
        cc.setStamps(cc.getStamps() + stampsToAdd);
        cc.setLastStampAt(LocalDateTime.now());

        return repo.save(cc);
    }

    public void redeem(UUID customerCardId, UUID rewardId) {

        CustomerCard cc = repo.findById(customerCardId).get();
        Reward reward = rewardRepo.findById(rewardId).get();

        if (cc.getStamps() < reward.getRequiredStamps()) {
            throw new RuntimeException("Not enough stamps");
        }

        cc.setStamps(cc.getStamps() - reward.getRequiredStamps());

        repo.save(cc);
    }

//    public void addPoints(UUID customerCardId, int points) {
//
//        CustomerCard cc = repo.findById(customerCardId).get();
//
//        cc.setPoints(cc.getPoints() + points);
//
//        repo.save(cc);
//
//        // log
//        transactionRepo.save(new Transaction(
//                cc, "ADD_POINTS", points
//        ));
//    }

}
