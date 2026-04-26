package com.takaful.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StateDto {
    private String code;
    private String nameEn;
    private String nameAr;
    private String countryCode;
}
