package com.resua.observations.infrastructure.adapters.out.database.mappers;

import com.resua.observations.domain.models.Location;
import com.resua.observations.infrastructure.adapters.out.database.entities.LocationEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    Location toModel(LocationEntity entity);
    LocationEntity toEntity(Location model);
}

