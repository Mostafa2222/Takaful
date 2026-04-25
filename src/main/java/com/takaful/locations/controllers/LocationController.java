package com.takaful.locations.controllers;

import com.takaful.locations.requests.LocationRequest;
import com.takaful.locations.responses.LocationResponse;
import com.takaful.locations.services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService service;

    @PostMapping
    public LocationResponse create(@RequestBody LocationRequest request) {
        return service.create(request);
    }

    @GetMapping("/countries")
    public List<LocationResponse> countries() {
        return service.getCountries();
    }

    @GetMapping("/{parentId}/children")
    public List<LocationResponse> children(@PathVariable UUID parentId) {
        return service.getChildren(parentId);
    }

    @GetMapping("/search")
    public List<LocationResponse> search(
            @RequestParam String query
    ) {
        return service.search(query);
    }
}
