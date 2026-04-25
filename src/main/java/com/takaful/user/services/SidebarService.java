package com.takaful.user.services;

import com.takaful.user.dtos.SidebarDto;
import com.takaful.user.entities.SidebarMenu;
import com.takaful.user.mappers.SidebarMapper;
import com.takaful.user.repositories.SidebarMenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class SidebarService {

    private final SidebarMenuRepository repo;
    private final SidebarMapper mapper;

    public List<SidebarDto> getSidebar(Authentication auth) {

        Set<String> permissions = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        List<SidebarMenu> menus = repo.findAllByIsActiveTrueOrderByMenuOrderAsc();

        Map<Long, List<SidebarMenu>> childrenMap = menus.stream()
                .filter(m -> m.getParentId() != null)
                .collect(Collectors.groupingBy(SidebarMenu::getParentId));

        System.out.println("PERMISSIONS FROM AUTH: " + permissions);

        return menus.stream()
                .filter(m -> m.getParentId() == null)
                .map(parent -> {

                    List<SidebarDto> children = childrenMap
                            .getOrDefault(parent.getId(), List.of())
                            .stream()
                            .filter(c -> c.getPermissionCode().equals("PUBLIC")
                                    || permissions.contains(c.getPermissionCode()))
                            .map(child -> {
                                SidebarDto cDto = new SidebarDto();
                                cDto.setId(child.getId());
                                cDto.setTitleKey(child.getTitleKey());
                                cDto.setIcon(child.getIcon());
                                cDto.setRoute(child.getRoute());
                                return cDto;
                            })
                            .toList();

                    if (children.isEmpty()) return null;

                    SidebarDto dto = new SidebarDto();
                    dto.setId(parent.getId());
                    dto.setTitleKey(parent.getTitleKey());
                    dto.setIcon(parent.getIcon());
                    dto.setRoute(parent.getRoute());
                    dto.setChildren(children);

                    return dto;
                })
                .filter(Objects::nonNull)
                .toList();
    }
}

