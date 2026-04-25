package com.takaful.requests;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

public record CreateSlotRequestDTO(
        @NotNull LocalDate date,
        @NotNull String timeSlot,
        @NotNull UUID areaId,
        @NotNull UUID teamId,
        @NotNull Integer capacity
) {}
