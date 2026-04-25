package com.takaful.eventslisteners;

import com.takaful.services.GoogleWalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WalletUpdateListener {

    private final GoogleWalletService googleWalletService;

    @Async
    @EventListener
    public void handleWalletUpdate(WalletUpdateEvent event) {

        try {
            googleWalletService.updateWalletObject(event.getCustomerCard());
        } catch (Exception e) {
            System.out.println("Wallet update failed: " + e.getMessage());
        }
    }
}