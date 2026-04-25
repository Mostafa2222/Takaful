package com.takaful.repositories;
import com.takaful.entities.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StateRepository extends JpaRepository<State, Long> {
    List<State> findByCountryCode(String countryCode);
    @Query("""
        SELECT s FROM State s
        WHERE LOWER(s.nameEn) LIKE LOWER(CONCAT('%', :query, '%'))
        OR LOWER(s.nameAr) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    List<State> search(@Param("query") String query);
}