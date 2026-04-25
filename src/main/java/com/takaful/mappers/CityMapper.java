package com.takaful.mappers;

import com.takaful.dtos.CityDto;
import com.takaful.entities.City;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CityMapper {

    @Mapping(source = "admin1Code", target = "stateCode")
    @Mapping(source = "countryCode", target = "countryCode")
    CityDto toDto(City city);

    List<CityDto> toDtoList(List<City> cities);
}