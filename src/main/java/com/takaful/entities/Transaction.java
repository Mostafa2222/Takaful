package com.takaful.entities;

import com.takaful.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private CustomerCard customerCard;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    private int value;

    private LocalDateTime createdAt;
}
