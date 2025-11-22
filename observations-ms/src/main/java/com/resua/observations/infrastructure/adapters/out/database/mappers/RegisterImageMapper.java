package com.resua.observations.infrastructure.adapters.out.database.mappers;

import com.resua.observations.domain.models.RegisterImage;
import com.resua.observations.infrastructure.adapters.out.database.entities.RegisterImageEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RegisterImageMapper {
    RegisterImage toModel(RegisterImageEntity entity);
    List<RegisterImage> toModel(List<RegisterImageEntity> entities);
}

