package com.takaful.dtos;

import lombok.Data;

@Data
public class CardDesignDTO {

    private String logoUrl;
    private String logoInsideUrl;
    private String stampBackgroundUrl;

    private String primaryColor;
    private String textColor;
    private String headerColor;

    private String slogan;
    private String welcomeMessage;
}
