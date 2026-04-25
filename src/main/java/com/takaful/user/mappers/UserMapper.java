package com.takaful.user.mappers;

import com.takaful.user.dtos.UserDto;
import com.takaful.user.entities.Permission;
import com.takaful.user.entities.Role;
import com.takaful.user.entities.User;
import com.takaful.user.responses.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "roles", expression = "java(mapRoles(user))")
    @Mapping(target = "permissions", expression = "java(mapPermissions(user))")
    UserDto toDto(User user);

    default List<String> mapRoles(User user) {
        return user.getRoles().stream()
                .map(Role::getName)
                .toList();
    }

    default List<String> mapPermissions(User user) {
        return user.getRoles().stream()
                .flatMap(r -> r.getPermissions().stream())
                .map(Permission::getCode)
                .distinct()
                .toList();
    }


    @Mapping(target = "role", expression = "java(user.getRoles().stream().findFirst().map(r -> r.getName()).orElse(\"\"))")
    UserResponse toUserDto(User user);

    List<UserResponse> toDtoList(List<User> users);
}
