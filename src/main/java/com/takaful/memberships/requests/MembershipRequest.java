package com.takaful.memberships.requests;

import com.takaful.memberships.enums.DurationType;
import lombok.Data;

import java.util.List;

@Data
public class MembershipRequest {

    private String nameAr;
    private String nameEn;

    private DurationType durationType;
    private Integer durationValue;

    private Double price;
    private Integer cardsCount;
    private Integer orderIndex;
    private String color;

    private Boolean isActive;

    private List<FeatureRequest> features;
}