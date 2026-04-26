package com.takaful.entities;

import com.takaful.user.entities.BaseEntity;
import com.takaful.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "wallets")
@Getter @Setter
public class Wallet extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    private BigDecimal balance = BigDecimal.ZERO;
}