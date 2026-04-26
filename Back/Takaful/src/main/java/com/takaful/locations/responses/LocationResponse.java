package com.takaful.locations.responses;


import com.takaful.locations.enums.LocationType;
import lombok.Data;

import java.util.UUID;

@Data
public class LocationResponse {

    private UUID id;

    private String nameAr;
    private String nameEn;

    private String code;

    private LocationType type;

    private UUID parentId;

    private String countryCode;

    private Double lat;
    private Double lng;
}