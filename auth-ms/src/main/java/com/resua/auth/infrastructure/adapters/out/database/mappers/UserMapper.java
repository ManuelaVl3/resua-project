package com.resua.auth.infrastructure.adapters.out.database.mappers;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.out.database.entities.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toModel(UserEntity entity);
    UserEntity toEntity(User model);
}
