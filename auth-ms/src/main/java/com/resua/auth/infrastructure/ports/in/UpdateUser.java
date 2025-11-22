package com.resua.auth.infrastructure.ports.in;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.UpdateUserRequestDTO;

import java.util.Optional;

public interface UpdateUser {

    Optional<User> updateUser(Long userId, UpdateUserRequestDTO updateRequest);
}

