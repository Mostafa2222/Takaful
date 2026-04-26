package com.takaful.response;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CustomerCardResponse {

    private UUID id;
    private UUID customerId;
    private UUID cardId;

    private int stamps;
    private boolean rewardAvailable;
    private int points;

    private String qrCode;
}
