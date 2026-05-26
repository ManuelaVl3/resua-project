package com.resua.auth.support;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.RegistrationRequestDTO;
import com.resua.auth.infrastructure.adapters.in.request.ResetPasswordRequestDTO;
import com.resua.auth.infrastructure.adapters.in.request.UpdateUserRequestDTO;
import com.resua.auth.infrastructure.adapters.in.request.VerifyAnswerRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.entities.UserEntity;

public final class UserTestFactory {

    private UserTestFactory() {
    }

    public static User user(Long id, String email) {
        return User.builder()
                .id(id)
                .name("Manuela")
                .lastName("Vélez")
                .email(email)
                .password("hashedPassword")
                .securityQuestion("¿Cuál es tu mascota?")
                .secretAnswer("Nicky")
                .build();
    }

    public static UserEntity userEntity(String email) {
        UserEntity entity = new UserEntity();
        entity.setId(1L);
        entity.setName("Manuela");
        entity.setLastName("Vélez");
        entity.setEmail(email);
        entity.setPassword("$2a$10$hashed");
        entity.setSecurityQuestion("¿Cuál es tu mascota?");
        entity.setSecretAnswer("Nicky");
        return entity;
    }

    public static RegistrationRequestDTO registrationRequest() {
        RegistrationRequestDTO dto = new RegistrationRequestDTO();
        dto.setName("Manuela");
        dto.setLastName("Vélez");
        dto.setEmail("manuela@test.com");
        dto.setPassword("password123");
        dto.setSecurityQuestion("¿Cuál es tu mascota?");
        dto.setSecretAnswer("Nicky");
        return dto;
    }

    public static VerifyAnswerRequestDTO verifyAnswerRequest(Long userId, String answer) {
        VerifyAnswerRequestDTO dto = new VerifyAnswerRequestDTO();
        dto.setUserId(userId);
        dto.setSecretAnswer(answer);
        return dto;
    }

    public static ResetPasswordRequestDTO resetPasswordRequest(Long userId, String newPassword, String confirmPassword) {
        ResetPasswordRequestDTO dto = new ResetPasswordRequestDTO();
        dto.setUserId(userId);
        dto.setNewPassword(newPassword);
        dto.setConfirmPassword(confirmPassword);
        return dto;
    }

    public static UpdateUserRequestDTO updateUserRequest(String name) {
        UpdateUserRequestDTO dto = new UpdateUserRequestDTO();
        dto.setName(name);
        return dto;
    }
}
