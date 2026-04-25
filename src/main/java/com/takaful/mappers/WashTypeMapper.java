package com.takaful.mappers;

import com.takaful.entities.WashType;
import com.takaful.dtos.WashTypeDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WashTypeMapper {

    default WashTypeDTO toDto(WashType washType, String lang) {
        return new WashTypeDTO(
                washType.getId(),
                "ar".equals(lang) ? washType.getNameAr() : washType.getNameEn()
        );
    }
}