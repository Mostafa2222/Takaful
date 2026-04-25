package com.takaful.repositories;
import com.takaful.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findByAdmin1Code(String admin1Code);
    @Query("""
    SELECT c FROM City c
    WHERE LOWER(c.nameEn) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(c.nameAr) LIKE LOWER(CONCAT('%', :query, '%'))
""")
    List<City> search(String query);
}
