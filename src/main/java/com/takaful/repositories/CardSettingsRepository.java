package com.takaful.repositories;

import com.takaful.entities.CardSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CardSettingsRepository extends JpaRepository<CardSettings, UUID> {

    Optional<CardSettings> findByCardId(UUID cardId);
}
