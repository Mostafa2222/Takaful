package com.takaful.user.entities;

//import com.takaful.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter
public class User extends BaseEntity {

    @Column(name = "user_key")
    private Long userKey;
    private String nameAr;
    private String nameEn;

//    private String lastNameAr;
//    private String lastNameEn;

    @Column(unique = true)
    private String username;

    private String phone;
    private String email;
    private String password;

    private String country;
    private String city;

    private Boolean isActive = true;
    private Boolean canPrint = false;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;

    @OneToMany(mappedBy = "parent")
    private List<User> children;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    public boolean hasRole(String roleNameEn) {
        return this.role != null &&
                this.role.getNameEn().equalsIgnoreCase(roleNameEn);
    }
}

