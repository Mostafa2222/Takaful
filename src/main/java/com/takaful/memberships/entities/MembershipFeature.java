package com.takaful.memberships.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "membership_features")
@Data
public class MembershipFeature {

    @Id
    private UUID id;

    private String nameAr;
    private String nameEn;

    @ManyToOne
    @JoinColumn(name = "membership_id")
    @JsonIgnore
    private Membership membership;
}
