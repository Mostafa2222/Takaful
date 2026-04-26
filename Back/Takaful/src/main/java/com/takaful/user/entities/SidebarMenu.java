package com.takaful.user.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "sidebar_menus")
@Getter
@Setter
public class SidebarMenu{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title_key")
    private String titleKey;
    private String icon;
    private String route;

//    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "menu_order")
    private Integer menuOrder;

//    private String role;

//    private String permission;
    private String permissionCode;
    @Column(name = "is_active")
    private Boolean isActive;
}

