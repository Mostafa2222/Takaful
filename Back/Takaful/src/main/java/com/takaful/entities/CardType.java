package com.takaful.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "card_types")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardType {

    @Id
    @GeneratedValue
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
