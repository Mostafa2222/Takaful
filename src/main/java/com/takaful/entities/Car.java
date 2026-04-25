package com.takaful.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.takaful.user.entities.BaseEntity;
import com.takaful.user.entities.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cars")
@Getter @Setter
public class Car extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @JsonIgnore
    private User user;

    private String brand;
    private String model;
    private String size;
    private String color;
    private String plateLetters;
    private String plateNumbers;
}
