package com.takaful.repositories;

import com.takaful.entities.WashType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WashTypeRepository extends JpaRepository<WashType, UUID> {
}
