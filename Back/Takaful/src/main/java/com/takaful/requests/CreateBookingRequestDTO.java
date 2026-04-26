package com.takaful.requests;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record CreateBookingRequestDTO(
        @NotNull UUID carId,
        @NotNull UUID addressId,
        UUID packageId,
        @NotNull UUID washTypeId,
        @NotNull LocalDate bookingDate,
        @NotNull String timeSlot,
        List<UUID> serviceIds,
        String notes
) {}
