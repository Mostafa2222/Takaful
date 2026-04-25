package com.takaful.memberships.responses;

import com.takaful.memberships.enums.DurationType;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class MembershipResponse {

    private UUID id;

    private String nameAr;
    private String nameEn;

    private DurationType durationType;
    private Integer durationValue;

    private Double price;

    private Integer cardsCount;
    private Integer orderIndex;
    private String color;

    private Boolean isActive;

    private List<String> features;
}
