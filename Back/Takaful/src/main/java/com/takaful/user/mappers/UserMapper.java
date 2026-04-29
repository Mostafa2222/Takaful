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

    @Mapping(target = "role", expression = "java(mapRole(user))")
    @Mapping(target = "permissions", expression = "java(mapPermissions(user))")
    UserDto toDto(User user);

    default String mapRole(User user) {
        return user.getRole() != null
                ? user.getRole().getNameEn()
                : null;
    }

    default List<String> mapPermissions(User user) {
        if (user.getRole() == null) return List.of();

        return user.getRole().getPermissions().stream()
                .map(Permission::getCode)
                .toList();
    }


    @Mapping(target = "role", expression = "java(mapRole(user))")
    @Mapping(target = "formattedUserKey", expression = "java(formatUserKey(user.getUserKey()))")
    UserResponse toUserDto(User user);

    List<UserResponse> toDtoList(List<User> users);

    default String formatUserKey(Long userKey) {
        if (userKey == null) return null;
        return String.format("U-%04d", userKey);
    }
}
