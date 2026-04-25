package com.takaful.user.services;

import com.takaful.user.dtos.RoleDto;
import com.takaful.user.entities.Permission;
import com.takaful.user.entities.Role;
import com.takaful.user.repositories.PermissionRepository;
import com.takaful.user.repositories.RoleRepository;
import com.takaful.user.repositories.RoleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @Override
    public List<RoleDto> getAllRoles() {

        return roleRepository.findAll().stream()
                .map(role -> {
                    RoleDto dto = new RoleDto();
                    dto.setId(role.getId());
                    dto.setName(role.getName());

                    Set<String> permissions = role.getPermissions().stream()
                            .map(Permission::getCode)
                            .collect(Collectors.toSet());

                    dto.setPermissions(permissions);

                    return dto;
                })
                .toList();
    }

    @Override
    public void updatePermissions(Long roleId, Set<String> codes) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Set<Permission> permissions = permissionRepository.findByCodeIn(codes);

        role.setPermissions(permissions);

        roleRepository.save(role);
    }
}
