package com.takaful.controllers;

import com.takaful.entities.Card;
import com.takaful.entities.Customer;
import com.takaful.enums.CardStatus;
import com.takaful.repositories.CardRepository;
import com.takaful.requests.AssignCardRequest;
import com.takaful.requests.CreateCustomerWithCardRequest;
import com.takaful.response.CustomerCardResponse;
import com.takaful.services.CustomerCardService;
import com.takaful.services.CustomerService;
import com.takaful.services.GoogleWalletService;
import com.takaful.services.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin
@RequiredArgsConstructor
public class CustomerController {

    private final CardRepository cardRepository;
    private final CustomerService customerService;
    private final GoogleWalletService walletService;
    private final CustomerCardService customerCardService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateCustomerWithCardRequest req) {
        try {

            // create customer
            Customer customer = new Customer();
            customer.setFullName(req.getFullName());
            customer.setPhoneNumber(req.getPhoneNumber());
            customer.setGender(req.getGender());
            customer.setCarPlate(req.getCarPlate());

            Customer saved = customerService.create(customer);

            // get card
            //Card card = cardRepository.findFirstByStatus(CardStatus.ACTIVE);
            Card card = cardRepository.findById(req.getCardId())
                    .orElseThrow();
            String qr = UUID.randomUUID() + "-WS-" + saved.getId();
            // assign card
            /*AssignCardRequest assignReq = new AssignCardRequest();
            assignReq.setCustomerId(saved.getId());
            assignReq.setCardId(req.getCardId());*/

            CustomerCardResponse cc = customerCardService.assign(saved, card, qr);



            // generate wallet with QR 🔥
            String walletUrl = walletService.generateWalletLink(
                    saved,
                    card,
                    cc.getQrCode()
            );
            System.out.println("walletUrl" + walletUrl);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "تم التسجيل بنجاح" + walletUrl,
                    "walletUrl", walletUrl
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }
}