package com.takaful.entities;


import com.takaful.user.entities.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;
@Entity
@Table(name = "loyal_branches")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoyalBranches extends BaseEntity {

    @NotBlank
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String description;

    private BigDecimal latitude;
    private BigDecimal longitude;

    @Column(name = "google_maps_link")
    private String googleMapsLink;

    @Column(name = "pos_branch_id")
    private Integer posBranchId;

    @Column(name = "public_link")
    private String publicLink;

    @Column(name = "qr_code_path")
    private String qrCodePath;
}