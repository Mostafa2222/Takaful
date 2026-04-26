package com.takaful.dtos;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.util.UUID;

public record LoyalBranchesDTO(
        UUID id,
        String label,
        BigDecimal latitude,
        BigDecimal longitude,
        String description,
        String name,
        String phoneNumber,
        String googleMapsLink,
        Integer posBranchId
) {}
