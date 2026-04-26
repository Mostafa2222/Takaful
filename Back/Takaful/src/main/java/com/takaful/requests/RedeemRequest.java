package com.takaful.requests;

import lombok.Data;

import java.util.UUID;

@Data
public class RedeemRequest {

    private String qrCode;
    private UUID rewardId;

    private int orderValue;
    private boolean online;
}
