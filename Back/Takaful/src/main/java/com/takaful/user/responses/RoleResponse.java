package com.takaful.user.responses;

import lombok.Data;

import java.util.Set;

@Data
public class RoleResponse {
    private Long id;
    //private String name;
    private String nameAr;
    private String nameEn;
    private Set<String> permissions;
}
