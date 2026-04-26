package com.takaful.dtos;

import java.math.BigDecimal;
import java.util.UUID;

public record PackageDTO(
        UUID id,
        String name,
        String description,
        BigDecimal price,
        Boolean isSubscription,
        Integer washesCount,
        Integer durationDays
) {}
