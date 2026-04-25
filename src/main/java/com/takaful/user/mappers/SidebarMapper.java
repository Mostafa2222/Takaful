package com.takaful.user.mappers;

import com.takaful.user.dtos.SidebarDto;
import com.takaful.user.entities.SidebarMenu;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SidebarMapper {

    SidebarDto toDto(SidebarMenu menu);

    List<SidebarDto> toDtoList(List<SidebarMenu> menus);
}