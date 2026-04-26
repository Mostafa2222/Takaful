package com.takaful.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScanResponse {

    private boolean success;

    private int currentStamps;
    private int requiredStamps;

    private boolean rewardUnlocked;
    private String rewardName;

    private String message;
}
