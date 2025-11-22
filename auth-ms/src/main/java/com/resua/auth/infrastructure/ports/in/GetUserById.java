package com.resua.auth.infrastructure.ports.in;

import com.resua.auth.domain.models.User;

import java.util.Optional;

public interface GetUserById {

    Optional<User> getUserById(Long userId);
}

