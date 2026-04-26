package com.takaful.repositories;

import com.takaful.entities.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CardRepository extends JpaRepository<Card, UUID> {

    boolean existsByNameAndCardType_Id(String name, Long cardTypeId);
    boolean existsByNameAndCardType_IdAndIdNot(String name, Long cardTypeId, UUID id);
    @Query("""
    SELECT c FROM Card c
    LEFT JOIN FETCH c.design
    LEFT JOIN FETCH c.settings
    LEFT JOIN FETCH c.rewards
    LEFT JOIN FETCH c.cardType
""")
    List<Card> findAllWithDetails();

    @Query("""
    SELECT c FROM Card c
    LEFT JOIN FETCH c.design
    LEFT JOIN FETCH c.settings
    LEFT JOIN FETCH c.rewards
    LEFT JOIN FETCH c.cardType
    WHERE c.id = :id
""")
    Optional<Card> findByIdWithDetails(UUID id);
}
