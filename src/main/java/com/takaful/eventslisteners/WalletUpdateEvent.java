package com.takaful.eventslisteners;

import com.takaful.entities.CustomerCard;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WalletUpdateEvent {

    private CustomerCard customerCard;
}
