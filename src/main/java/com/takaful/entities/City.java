package com.takaful.entities;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Table(name = "cities_clean")
@Data
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameEn;
    private String nameAr;
    private String countryCode;
    private String admin1Code;
    private Double latitude;
    private Double longitude;
}

