package com.takaful.locations.requests;

import com.takaful.locations.enums.LocationType;
import lombok.Data;

import java.util.UUID;

@Data
public class LocationRequest {

    private String nameAr;
    private String nameEn;
    private String code;

    private LocationType type;

    private UUID parentId;

    private Double lat;
    private Double lng;
}
