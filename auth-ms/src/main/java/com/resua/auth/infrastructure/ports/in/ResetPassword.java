package com.resua.auth.infrastructure.ports.in;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.ResetPasswordRequestDTO;

import java.util.Optional;

public interface ResetPassword {

    Optional<User> resetPassword(ResetPasswordRequestDTO resetRequest);
}

