package com.takaful.entities;

import com.takaful.enums.WalletTransactionType;
import com.takaful.user.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "wallet_transactions")
@Getter @Setter
public class WalletTransaction extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private Wallet wallet;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private WalletTransactionType type;

    private String reason;
}
