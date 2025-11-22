package com.resua.auth.infrastructure.ports.in;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.RegistrationRequestDTO;

public interface CreateUser {

    User createUser(RegistrationRequestDTO userDTO);
}
