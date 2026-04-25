package com.takaful.dtos;

import com.takaful.enums.DiscountType;
import lombok.Data;

import java.util.List;
import java.util.UUID;
@Data
public class RewardDTO {

    private String name;
    private int requiredStamps;

    private int minOrderValue;
    private int maxStampPerOrder;
    private int daysUntilExpiry;

    private boolean allowDiscounts;
    private boolean disallowStamps;

    private DiscountType discountType;
    private int discountValue;
    private Integer maxDiscount;

    private boolean allowModifierDiscount;

    private String beforeImage;
    private String afterImage;
    private String beforeRewardImage;
    private String afterRewardImage;

    private Integer creditType;
    private List<UUID> productIds;
}