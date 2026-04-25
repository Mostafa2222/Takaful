package com.takaful.user.dtos;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class UserDto {

    private UUID id;
    private String nameAr;
    private String nameEn;
    private String phone;

    private List<String> roles;
    private List<String> permissions;
}
