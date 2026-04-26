package com.takaful.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardSettingsDTO {

    private boolean showCustomerName;
    private boolean enableInvoiceNumber;
    private boolean allowMultiStamps;
    private boolean active;

    private int stampDelayMinutes;

    private String stampMessage;
    private String rewardMessage;
    private String giftText;
}
