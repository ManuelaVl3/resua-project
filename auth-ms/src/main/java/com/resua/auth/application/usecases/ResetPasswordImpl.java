package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.ResetPasswordRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.ports.in.ResetPassword;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResetPasswordImpl implements ResetPassword {

    private final UserAdapter userAdapter;

    @Override
    public Optional<User> resetPassword(ResetPasswordRequestDTO resetRequest) {
        // Validar que las contraseñas coincidan
        if (!resetRequest.getNewPassword().equals(resetRequest.getConfirmPassword())) {
            return Optional.empty();
        }

        return userAdapter.getUserById(resetRequest.getUserId())
                .map(user -> {
                    // La contraseña se hasheará en updateUser
                    user.setPassword(resetRequest.getNewPassword());
                    return userAdapter.updateUser(user);
                });
    }
}

