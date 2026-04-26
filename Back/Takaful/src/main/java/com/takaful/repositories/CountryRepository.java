package com.takaful.repositories;

import com.takaful.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, Long> {
    @Query("""
        SELECT c FROM Country c
        WHERE LOWER(c.nameEn) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(c.nameAr) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    List<Country> search(@Param("query") String query);
}
