package com.takaful.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CountryDto {
    private String code;
    private String nameEn;
    private String nameAr;
}
