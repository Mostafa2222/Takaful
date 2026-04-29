package com.takaful.user.requests;

import lombok.Data;

@Data
public class MenuRequest {

    private String code;

    private String nameAr;
    private String nameEn;
    private String group;

    private String route;
    private String icon;

    private Long parentId;
    private Integer menuOrder;
}