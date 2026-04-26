package com.takaful.repositories;

import com.takaful.entities.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WalletRepository extends JpaRepository<Wallet, UUID> {
    Wallet findByUserId(UUID userId);
}
