package com.takaful.response;

import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class RewardResponse {

    private UUID id;
    private String name;
    @Min(1)
    private int requiredStamps;
    private String discountType;
    private Integer maxDiscount;
}
