package com.takaful.user.services;

import com.takaful.user.entities.Permission;
import com.takaful.user.entities.Role;
import com.takaful.user.mappers.RoleMapper;
import com.takaful.user.repositories.PermissionRepository;
import com.takaful.user.repositories.RoleRepository;
import com.takaful.user.requests.CreateRoleRequest;
import com.takaful.user.responses.RoleResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final RoleMapper roleMapper;
//    @Override
//    public List<RoleDto> getAllRoles() {
//
//        return roleRepository.findAll().stream()
//                .map(role -> {
//                    RoleDto dto = new RoleDto();
//                    dto.setId(role.getId());
//                    dto.setName(role.getName());
//
//                    Set<String> permissions = role.getPermissions().stream()
//                            .map(Permission::getCode)
//                            .collect(Collectors.toSet());
//
//                    dto.setPermissions(permissions);
//
//                    return dto;
//                })
//                .toList();
//    }
//
//    @Override
    public List<RoleResponse> getAllRoles() {
        return roleMapper.toList(roleRepository.findAll());
    }
//    @Override
public void update(Long id, CreateRoleRequest req) {
    Role role = roleRepository.findById(id).orElseThrow();

    role.setNameAr(req.getNameAr());
    role.setNameEn(req.getNameEn());

    Set<Permission> permissions =
            permissionRepository.findByCodeIn(req.getPermissions());

    role.setPermissions(permissions);

    roleRepository.save(role);
}
//
//    @Override
public RoleResponse create(CreateRoleRequest req) {
    Role role = roleMapper.toEntity(req);

    Set<Permission> permissions =
            permissionRepository.findByCodeIn(req.getPermissions());

    role.setPermissions(permissions);

    return roleMapper.toResponse(roleRepository.save(role));
}

    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}
