package com.takaful.mappers;

import com.takaful.entities.PackageEntity;
import com.takaful.dtos.PackageDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PackageMapper {

    default PackageDTO toDto(PackageEntity pkg, String lang) {
        return new PackageDTO(
                pkg.getId(),
                "ar".equals(lang) ? pkg.getNameAr() : pkg.getNameEn(),
                "ar".equals(lang) ? pkg.getDescriptionAr() : pkg.getDescriptionEn(),
                pkg.getPrice(),
                pkg.getIsSubscription(),
                pkg.getWashesCount(),
                pkg.getDurationDays()
        );
    }
}
