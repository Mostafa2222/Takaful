package com.takaful.dtos;

import java.util.UUID;

public record CarDTO(
        UUID id,
        String brand,
        String model,
        String size,
        String color,
        String plateLetters,
        String plateNumbers
) {}
