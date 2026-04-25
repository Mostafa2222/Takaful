package com.takaful.entities;

import com.takaful.user.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "packages")
@Getter @Setter
public class PackageEntity extends BaseEntity {

    private String nameAr;
    private String nameEn;

    private String descriptionAr;
    private String descriptionEn;

    @ManyToOne(fetch = FetchType.LAZY)
    private WashType washType;

    private Integer washesCount;
    private Integer durationDays;

    private BigDecimal price;
    private Boolean isSubscription = false;
}

