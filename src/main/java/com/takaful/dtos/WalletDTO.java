package com.takaful.dtos;

import java.math.BigDecimal;
import java.util.UUID;

public record WalletDTO(
        UUID id,
        BigDecimal balance
) {}
