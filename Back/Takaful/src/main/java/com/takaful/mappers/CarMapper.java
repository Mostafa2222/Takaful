package com.takaful.mappers;

import com.takaful.entities.Car;
import com.takaful.dtos.CarDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarDTO toDto(Car car);
}
