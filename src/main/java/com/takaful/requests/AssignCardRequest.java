package com.takaful.requests;

import lombok.Data;

import java.util.UUID;

@Data
public class AssignCardRequest {
    private UUID customerId;
    private UUID cardId;
}
