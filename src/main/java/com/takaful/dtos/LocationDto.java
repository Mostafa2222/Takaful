package com.takaful.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LocationDto {
    private Long id;
    private String nameEn;
    private String nameAr;
    private String type; // COUNTRY / STATE / CITY
}
