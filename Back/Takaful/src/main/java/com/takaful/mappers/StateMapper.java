package com.takaful.mappers;

import com.takaful.dtos.StateDto;
import com.takaful.entities.State;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StateMapper {

    @Mapping(source = "admin1Code", target = "code")
    StateDto toDto(State state);

    List<StateDto> toDtoList(List<State> states);
}
