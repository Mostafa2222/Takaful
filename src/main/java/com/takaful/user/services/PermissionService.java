package com.takaful.user.services;

import com.takaful.user.dtos.PermissionDto;
import com.takaful.user.entities.Permission;
import com.takaful.user.repositories.PermissionRepository;
import com.takaful.user.repositories.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PermissionService {
    private final PermissionRepository permissionRepository;

    public List<Map<String, Object>> getGroupedPermissions() {

        List<Permission> perms = permissionRepository.findAll();

        Map<String, List<PermissionDto>> grouped = perms.stream()
                .map(p -> {
                    PermissionDto dto = new PermissionDto();
                    dto.setCode(p.getCode());
                    dto.setNameAr(p.getNameAr());
                    dto.setNameEn(p.getNameEn());
                    dto.setGroup(p.getGroupName());
                    return dto;
                })
                .collect(Collectors.groupingBy(PermissionDto::getGroup));

        return grouped.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("group", entry.getKey());
                    map.put("permissions", entry.getValue());
                    return map;
                })
                .toList();
    }
}
