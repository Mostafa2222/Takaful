package com.takaful.user.dtos;

import lombok.Data;

import java.util.List;

@Data
public class SidebarDto {

    private Long id;
    private String titleKey;
    private String icon;
    private String route;

    private List<SidebarDto> children;
}