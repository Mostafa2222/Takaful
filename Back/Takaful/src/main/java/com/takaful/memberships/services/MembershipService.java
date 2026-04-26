package com.takaful.memberships.services;

import com.takaful.memberships.entities.Membership;
import com.takaful.memberships.entities.MembershipFeature;
import com.takaful.memberships.mappers.MembershipMapper;
import com.takaful.memberships.repositories.MembershipRepository;
import com.takaful.memberships.requests.MembershipRequest;
import com.takaful.memberships.responses.MembershipResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository repository;
    private final MembershipMapper mapper;

    // ===============================
    // ➕ CREATE
    // ===============================
    public MembershipResponse create(MembershipRequest request) {

        Membership m = new Membership();

        m.setId(UUID.randomUUID());
        m.setNameAr(request.getNameAr());
        m.setNameEn(request.getNameEn());

        m.setDurationType(request.getDurationType());
        m.setDurationValue(request.getDurationValue());

        m.setPrice(request.getPrice());
        m.setCardsCount(request.getCardsCount());
        if (request.getColor() == null) {
            m.setColor("#6366f1");
        }else {
            m.setColor(request.getColor());
        }
        if (request.getIsActive() == null) {
            m.setIsActive(true);
        }else {
            m.setIsActive(request.getIsActive());
        }
        m.setCreatedAt(LocalDateTime.now());

        List<MembershipFeature> features = request.getFeatures()
                .stream()
                .map(f -> {
                    MembershipFeature mf = new MembershipFeature();
                    mf.setId(UUID.randomUUID());
                    mf.setNameAr(f.getNameAr());
                    mf.setNameEn(f.getNameEn());
                    mf.setMembership(m);
                    return mf;
                }).toList();

        m.setFeatures(features);

        repository.save(m);

        return mapper.toResponse(m);
    }

    public Page<MembershipResponse> getAll(
            int page,
            int size,
            String search,
            Boolean isActive
    ) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<Membership> result;

        if (search != null && !search.isEmpty()) {
            result = repository.search(search, isActive, pageable);
        } else {
            if (isActive != null) {
                result = repository.findByIsActive(isActive, pageable);
            } else {
                result = repository.findAll(pageable);
            }
        }

        return result.map(mapper::toResponse);
    }

    public MembershipResponse update(UUID id, MembershipRequest request) {

        Membership m = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Membership not found"));

        m.setNameAr(request.getNameAr());
        m.setNameEn(request.getNameEn());

        m.setDurationType(request.getDurationType());
        m.setDurationValue(request.getDurationValue());

        m.setPrice(request.getPrice());
        m.setCardsCount(request.getCardsCount());
        m.setColor(request.getColor());
        m.setIsActive(request.getIsActive());

        m.getFeatures().clear();

        List<MembershipFeature> features = request.getFeatures()
                .stream()
                .map(f -> {
                    MembershipFeature mf = new MembershipFeature();
                    mf.setId(UUID.randomUUID());
                    mf.setNameAr(f.getNameAr());
                    mf.setNameEn(f.getNameEn());
                    mf.setMembership(m);
                    return mf;
                }).toList();

        m.getFeatures().addAll(features);

        repository.save(m);

        return mapper.toResponse(m);
    }

    public void delete(UUID id) {
        repository.deleteById(id);
    }

    public MembershipResponse toggleStatus(UUID id) {
        Membership m = repository.findById(id).orElseThrow();

        Boolean current = m.getIsActive() != null ? m.getIsActive() : false;

        m.setIsActive(!current);

        repository.save(m);

        return mapper.toResponse(m);
    }
}
