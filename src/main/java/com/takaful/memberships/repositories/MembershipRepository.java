package com.takaful.memberships.repositories;

import com.takaful.memberships.entities.Membership;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface MembershipRepository extends JpaRepository<Membership, UUID> {
    @Query("""
SELECT m FROM Membership m
WHERE (:search IS NULL OR
      LOWER(m.nameAr) LIKE LOWER(CONCAT('%', :search, '%')) OR
      LOWER(m.nameEn) LIKE LOWER(CONCAT('%', :search, '%')))
AND (:isActive IS NULL OR m.isActive = :isActive)
""")
    Page<Membership> search(
            @Param("search") String search,
            @Param("isActive") Boolean isActive,
            Pageable pageable
    );

    Page<Membership> findByIsActive(Boolean isActive, Pageable pageable);
}