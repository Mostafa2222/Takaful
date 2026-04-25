package com.takaful.locations.services;

import com.takaful.locations.entities.Location;
import com.takaful.locations.enums.LocationType;
import com.takaful.locations.mappers.LocationMapper;
import com.takaful.locations.repositories.LocationRepository;
import com.takaful.locations.requests.LocationRequest;
import com.takaful.locations.responses.LocationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository repo;
    private final LocationMapper mapper;


    public LocationResponse create(LocationRequest request) {

        Location location = mapper.toEntity(request);

        if (request.getType() == LocationType.COUNTRY) {
            location.setCountryCode(request.getCode());
        } else {
            Location parent = repo.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent not found"));

            location.setCountryCode(parent.getCountryCode());
        }

        Location saved = repo.save(location);

        return mapper.toResponse(saved);
    }
    public List<LocationResponse> getCountries() {
        return mapper.toResponseList(
                repo.findByType(LocationType.COUNTRY)
        );
    }

    public List<LocationResponse> getChildren(UUID parentId) {
        return mapper.toResponseList(
                repo.findByParentId(parentId)
        );
    }

    public List<LocationResponse> search(String query) {

        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        return repo.search(query)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }
}
