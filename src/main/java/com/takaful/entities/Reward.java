package com.takaful.entities;

import com.takaful.enums.DiscountType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@ToString(exclude = "card")
@Table(name = "rewards")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reward {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;

    @NotNull
    private String name;
    @Min(1)
    private int requiredStamps;

    private String beforeImage;
    private String afterImage;

    private String afterRewardImage;
    private String beforeRewardImage;

    private int minOrderValue;
    private int maxStampPerOrder;
    private int daysUntilExpiry;

    private boolean allowWithDiscount;
    private boolean disableForOnlineOrders;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;
    private int discountValue;

    private Integer maxDiscount;

    private Integer creditType;

    @ElementCollection
    private List<UUID> productIds;

    private boolean applyOnAddons;


}
