package com.resua.auth.infrastructure.ports.in;

import com.resua.auth.domain.models.User;

import java.util.Optional;

public interface GetUserByEmail {

    Optional<User> getUserByEmail(String email);
}

