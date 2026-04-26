package com.takaful.locations.repositories;

import com.takaful.locations.entities.Location;
import com.takaful.locations.enums.LocationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface LocationRepository extends JpaRepository<Location, UUID> {

    List<Location> findByType(LocationType type);

    List<Location> findByParentId(UUID parentId);

    List<Location> findByCountryCode(String countryCode);

    @Query("""
SELECT l FROM Location l
WHERE LOWER(l.nameAr) LIKE LOWER(CONCAT('%', :query, '%'))
   OR LOWER(l.nameEn) LIKE LOWER(CONCAT('%', :query, '%'))
ORDER BY l.type
""")
    List<Location> search(@Param("query") String query);
}
