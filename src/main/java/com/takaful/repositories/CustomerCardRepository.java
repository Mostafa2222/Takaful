package com.takaful.repositories;

import com.takaful.entities.CustomerCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CustomerCardRepository extends JpaRepository<CustomerCard, UUID> {
    Optional<CustomerCard> findByQrCode(String qr);
    Optional<CustomerCard> findByCustomerIdAndCardId(UUID customerId, UUID cardId);
}
