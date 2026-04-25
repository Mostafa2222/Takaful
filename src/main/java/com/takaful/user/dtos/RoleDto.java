package com.takaful.user.dtos;

import lombok.Data;

import java.util.Set;

@Data
public class RoleDto {
    private Long id;
    private String name;
    private Set<String> permissions;
}
