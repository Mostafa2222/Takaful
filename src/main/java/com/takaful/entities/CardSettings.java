package com.takaful.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "card_settings")
@Getter
@Setter
@ToString(exclude = "card")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardSettings {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;

    private boolean showCustomerName;
    private boolean enableInvoice;
    private boolean allowMultiStamps;
    private boolean active;

    private int stampDelayMinutes;

    private String giftText;
    private String stampMessage;
    private String rewardMessage;
}