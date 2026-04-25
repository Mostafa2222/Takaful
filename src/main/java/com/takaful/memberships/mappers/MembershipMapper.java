package com.takaful.memberships.mappers;

import com.takaful.memberships.entities.Membership;
import com.takaful.memberships.responses.MembershipResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MembershipMapper {

    @Mapping(target = "features",
            expression = "java(entity.getFeatures().stream().map(f -> f.getNameAr()).toList())")
    MembershipResponse toResponse(Membership entity);
}