package com.takaful.repositories;

import com.takaful.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    boolean existsByPhoneNumber(String phoneNumber);
}
