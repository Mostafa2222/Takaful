package com.takaful.locations.mappers;

import com.takaful.locations.entities.Location;
import com.takaful.locations.requests.LocationRequest;
import com.takaful.locations.responses.LocationResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    Location toEntity(LocationRequest request);

    LocationResponse toResponse(Location location);

    List<LocationResponse> toResponseList(List<Location> list);
}
