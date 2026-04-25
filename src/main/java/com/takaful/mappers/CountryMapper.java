package com.takaful.mappers;

import com.takaful.dtos.CountryDto;
import com.takaful.entities.Country;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CountryMapper {

    @Mapping(source = "countryCode", target = "code")
    CountryDto toDto(Country country);

    List<CountryDto> toDtoList(List<Country> countries);
}
