package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.UpdateUserRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.ports.in.UpdateUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UpdateUserImpl implements UpdateUser {

    private final UserAdapter userAdapter;

    @Override
    public Optional<User> updateUser(Long userId, UpdateUserRequestDTO updateRequest) {
        return userAdapter.getUserById(userId)
                .map(existingUser -> {
                    if (updateRequest.getName() != null) {
                        existingUser.setName(updateRequest.getName());
                    }
                    if (updateRequest.getLastName() != null) {
                        existingUser.setLastName(updateRequest.getLastName());
                    }
                    if (updateRequest.getEmail() != null) {
                        existingUser.setEmail(updateRequest.getEmail());
                    }
                    if (updateRequest.getPassword() != null) {
                        existingUser.setPassword(updateRequest.getPassword());
                    }
                    if (updateRequest.getSecurityQuestion() != null) {
                        existingUser.setSecurityQuestion(updateRequest.getSecurityQuestion());
                    }
                    if (updateRequest.getSecretAnswer() != null) {
                        existingUser.setSecretAnswer(updateRequest.getSecretAnswer());
                    }
                    
                    return userAdapter.updateUser(existingUser);
                });
    }
}

