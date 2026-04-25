package com.takaful.repositories;

import com.takaful.entities.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PackageRepository extends JpaRepository<PackageEntity, UUID> {
    List<PackageEntity> findByIsSubscription(Boolean isSubscription);
}
