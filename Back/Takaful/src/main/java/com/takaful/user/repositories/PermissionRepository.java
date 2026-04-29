package com.takaful.user.repositories;

import com.takaful.user.entities.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    Set<Permission> findByCodeIn(Set<String> codes);

    Optional<Permission> findByCode(String code);
    boolean existsByCode(String code);

}
