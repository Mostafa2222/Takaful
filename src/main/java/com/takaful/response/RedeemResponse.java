package com.takaful.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RedeemResponse {

    private boolean success;

    private int originalAmount;
    private int discountAmount;
    private int finalAmount;

    private String message;
}
