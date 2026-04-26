package com.takaful.entities;

import com.takaful.user.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "wash_types")
@Getter @Setter
public class WashType extends BaseEntity {

    @Column(nullable = false)
    private String nameAr;

    private String nameEn;
}
