package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.RegistrationRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.ports.in.CreateUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateUserImpl implements CreateUser {

    private final UserAdapter userAdapter;

    @Override
    public User createUser(RegistrationRequestDTO userDTO) {
        User user = User.builder()
                .name(userDTO.getName())
                .lastName(userDTO.getLastName())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .securityQuestion(userDTO.getSecurityQuestion())
                .secretAnswer(userDTO.getSecretAnswer())
                .build();

        return userAdapter.createUser(user);
    }
}
