package com.takaful.locations.entities;

import com.takaful.locations.enums.LocationType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "locations")
@Data
public class Location {

    @Id
    @GeneratedValue
    private UUID id;

    private String nameAr;
    private String nameEn;
    private String code;

    @Enumerated(EnumType.STRING)
    private LocationType type;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Location parent;

    private String countryCode;

    private Double lat;
    private Double lng;
}
