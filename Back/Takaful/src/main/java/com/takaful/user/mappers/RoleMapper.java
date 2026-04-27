package com.takaful.user.mappers;

import com.takaful.user.entities.Permission;
import com.takaful.user.entities.Role;
import com.takaful.user.requests.CreateRoleRequest;
import com.takaful.user.responses.RoleResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(target = "permissions", source = "permissions")
    RoleResponse toResponse(Role role);

    @Mapping(target = "permissions", source = "permissions")
    Role toEntity(CreateRoleRequest request);

    List<RoleResponse> toList(List<Role> roles);

    default Set<String> map(Set<Permission> permissions) {
        if (permissions == null) return Set.of();

        return permissions.stream()
                .map(Permission::getCode)
                .collect(Collectors.toSet());
    }

    default Set<Permission> mapPermissions(Set<String> codes) {
        if (codes == null) return Set.of();

        return codes.stream()
                .map(code -> {
                    Permission p = new Permission();
                    p.setCode(code);
                    return p;
                })
                .collect(Collectors.toSet());
    }
}