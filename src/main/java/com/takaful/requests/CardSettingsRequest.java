package com.takaful.requests;

import lombok.Data;

@Data
public class CardSettingsRequest {

    private boolean showCustomerName;
    private boolean enableInvoice;
    private boolean allowMultiStamps;
    private boolean active;

    private int stampDelayMinutes;

    private String stampMessage;
    private String rewardMessage;
    private String giftText;
}
