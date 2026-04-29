package com.takaful.user.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.takaful.user.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Query("""
    SELECT u FROM User u
    LEFT JOIN FETCH u.role r
    LEFT JOIN FETCH r.permissions
    WHERE u.phone = :phone
""")
    User findByPhone(String phone);

    @Query("""
    SELECT u FROM User u
    LEFT JOIN FETCH u.role r
    LEFT JOIN FETCH r.permissions
    WHERE u.id = :id
""")
    Optional<User> findByIdWithRoles(@Param("id") UUID id);

    Page<User> findByParentId(UUID parentId, Pageable pageable);

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String username);

    @Query("""
SELECT u FROM User u
WHERE (
    :search IS NULL OR :search = '' OR
    LOWER(u.nameAr) LIKE LOWER(CONCAT('%', :search, '%')) OR
    LOWER(u.phone) LIKE LOWER(CONCAT('%', :search, '%'))
)
""")
    Page<User> searchAll(@Param("search") String search, Pageable pageable);



    @Query("""
SELECT u FROM User u
WHERE u.parent.id = :parentId
AND (:search IS NULL OR :search = '' OR
       LOWER(u.nameAr) LIKE LOWER(CONCAT('%', :search, '%')) OR
       LOWER(u.phone) LIKE LOWER(CONCAT('%', :search, '%'))
   )
""")
    Page<User> searchByParent(
            @Param("parentId") UUID parentId,
            @Param("search") String search,
            Pageable pageable
    );

}
