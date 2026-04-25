package com.takaful.entities;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Table(name = "states")
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameEn;
    private String nameAr;
    private String countryCode;
    private String admin1Code;
}
