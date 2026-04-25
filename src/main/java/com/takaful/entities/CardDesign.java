package com.takaful.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "card_design")
@Getter
@Setter
@ToString(exclude = "card")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardDesign {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    @JoinColumn(name = "card_id")
    private Card card;

    private String logoUrl;
    private String logoInsideUrl;
    private String stampBackgroundUrl;

    private String primaryColor;
    private String textColor;
    private String headerColor;

    private String slogan;
    private String welcomeMessage;

    private String rewardMessage;
}
