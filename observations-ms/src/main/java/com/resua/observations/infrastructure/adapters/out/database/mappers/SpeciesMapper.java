package com.resua.observations.infrastructure.adapters.out.database.mappers;

import com.resua.observations.domain.models.Species;
import com.resua.observations.infrastructure.adapters.out.database.entities.SpeciesEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SpeciesMapper {
    Species toModel(SpeciesEntity entity);
    SpeciesEntity toEntity(Species model);
}

