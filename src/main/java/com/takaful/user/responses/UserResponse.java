package com.takaful.user.responses;

import jakarta.persistence.Column;
import lombok.Data;

import java.util.UUID;

@Data
public class UserResponse {

    private UUID id;

    private String nameAr;
    private String nameEn;

    private String lastNameAr;
    private String lastNameEn;
    private String username;
    private String phone;
    private String email;
    private String country;
    private String city;
    private Boolean isActive;
    private Boolean canPrint;

    private String role;



}
