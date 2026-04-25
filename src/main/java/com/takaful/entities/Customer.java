package com.takaful.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "customers")
@Data
public class Customer {

    @Id
    @GeneratedValue
    private UUID id;

    private String fullName;
    private String phoneNumber;
    private Integer gender;
    private String carPlate;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    private LoyalBranches branch;
}
