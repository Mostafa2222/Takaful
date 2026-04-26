package com.takaful.dtos;

import lombok.Data;


@Data
public class CardTypeDTO {
    private Long id;

    private String name;
    private String code;
    private String description;
    private String icon;

    private boolean hasRewards;
    private boolean hasStamps;
    private boolean hasSubscription;
    private boolean hasCashback;
}
