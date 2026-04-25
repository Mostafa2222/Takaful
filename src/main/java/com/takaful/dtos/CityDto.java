package com.takaful.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CityDto {
    private Long id;
    private String nameEn;
    private String nameAr;
    private String stateCode;
    private String countryCode;
}
