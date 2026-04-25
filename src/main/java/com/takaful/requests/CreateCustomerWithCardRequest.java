package com.takaful.requests;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateCustomerWithCardRequest {

    private String fullName;
    private String phoneNumber;

    private Integer gender;
    private String carPlate;

    private UUID cardId;
}
