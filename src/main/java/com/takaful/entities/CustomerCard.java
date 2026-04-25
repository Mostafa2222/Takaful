package com.takaful.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customer_cards")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerCard {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

//    @ManyToOne
//    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;

    private int stamps;
    private int points;

    private String qrCode;

    private LocalDateTime lastStampAt;

    private String walletObjectId;

    private boolean rewardAvailable;
    private int currentCycle;
}
