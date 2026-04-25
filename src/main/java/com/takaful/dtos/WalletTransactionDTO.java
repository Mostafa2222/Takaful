package com.takaful.dtos;

import com.takaful.enums.WalletTransactionType;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record WalletTransactionDTO(
        UUID id,
        BigDecimal amount,
        WalletTransactionType type,
        String reason,
        OffsetDateTime createdAt
) {}
