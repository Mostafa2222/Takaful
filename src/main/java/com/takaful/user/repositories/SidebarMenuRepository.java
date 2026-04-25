package com.takaful.user.repositories;

import com.takaful.user.entities.SidebarMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SidebarMenuRepository extends JpaRepository<SidebarMenu, Long> {
//
//    List<SidebarMenu> findByRoleAndIsActiveTrueOrderByMenuOrderAsc(String role);
    List<SidebarMenu> findAllByIsActiveTrueOrderByMenuOrderAsc();
}

