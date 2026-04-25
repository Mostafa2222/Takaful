package com.takaful.services;

import com.takaful.entities.CustomerCard;
import com.takaful.eventslisteners.WalletUpdateEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WalletSyncService {

    private final ApplicationEventPublisher publisher;

    public void sync(CustomerCard cc) {
        publisher.publishEvent(new WalletUpdateEvent(cc));
    }
}