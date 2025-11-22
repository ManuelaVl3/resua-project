package com.resua.observations.infrastructure.adapters.out.database.mappers;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.out.database.entities.RegisterEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SpeciesMapper.class, LocationMapper.class, RegisterImageMapper.class})
public interface RegisterMapper {

    Register toModel(RegisterEntity entity);
    List<Register> toModel(List<RegisterEntity> entities);
    RegisterEntity toEntity(Register model);
}
