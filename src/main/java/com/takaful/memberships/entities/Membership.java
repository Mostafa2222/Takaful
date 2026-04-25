package com.takaful.memberships.entities;

import com.takaful.memberships.enums.DurationType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "memberships")
@Data
public class Membership {

    @Id
    private UUID id;

    private String nameAr;
    private String nameEn;

    @Enumerated(EnumType.STRING)
    private DurationType durationType;

    private Integer durationValue;

    private Double price;

    private Integer cardsCount;
    private Integer orderIndex;
    private String color;

    @Column(nullable = false)
    private Boolean isActive = true;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "membership", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<MembershipFeature> features;
}
