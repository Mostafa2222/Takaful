package com.takaful.repositories;

import com.takaful.entities.LoyalBranches;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LoyalBranchRepository extends JpaRepository<LoyalBranches, UUID> {
}