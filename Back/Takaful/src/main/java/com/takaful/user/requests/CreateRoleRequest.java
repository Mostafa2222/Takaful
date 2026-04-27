package com.takaful.user.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;

@Data
public class CreateRoleRequest {
    //private String name;
    @NotBlank(message = "Arabic name is required")
    private String nameAr;
    @NotBlank(message = "English name is required")
    private String nameEn;
    private Set<String> permissions;
}
