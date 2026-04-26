package com.takaful.memberships.controllers;

import com.takaful.memberships.entities.Membership;
import com.takaful.memberships.enums.DurationType;
import com.takaful.memberships.repositories.MembershipRepository;
import com.takaful.memberships.requests.MembershipRequest;
import com.takaful.memberships.responses.MembershipResponse;
import com.takaful.memberships.services.MembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/memberships")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipService service;
    private final MembershipRepository repo;

    @PostMapping
    @PreAuthorize("hasAuthority('MEMBERSHIP_CREATE')")
    public MembershipResponse create(@RequestBody MembershipRequest request) {
        return service.create(request);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('MEMBERSHIP_VIEW')")
    public Page<MembershipResponse> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isActive
    ) {
        return service.getAll(page, size, search, isActive);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('MEMBERSHIP_UPDATE')")
    public MembershipResponse update(
            @PathVariable UUID id,
            @RequestBody MembershipRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@permissionServiceUtil.has('MEMBERSHIP_DELETE')")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }

    @PatchMapping("/{id}/toggle")
    @PreAuthorize("hasAuthority('MEMBERSHIP_UPDATE')")
    public MembershipResponse toggle(@PathVariable UUID id) {
        return service.toggleStatus(id);
    }

    @PostMapping("/reorder")
    public void reorder(@RequestBody List<UUID> ids) {

        for (int i = 0; i < ids.size(); i++) {
            Membership m = repo.findById(ids.get(i)).orElseThrow();
            m.setOrderIndex(i);
            repo.save(m);
        }
    }

    @GetMapping("/duration-types")
    public List<DurationType> getDurationTypes() {
        return Arrays.asList(DurationType.values());
    }
}
