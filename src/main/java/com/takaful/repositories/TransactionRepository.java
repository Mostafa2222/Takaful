package com.takaful.repositories;

import com.takaful.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

}