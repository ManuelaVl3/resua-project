package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.ResetPasswordRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.support.UserTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResetPasswordImplTest {

    @Mock
    private UserAdapter userAdapter;

    @InjectMocks
    private ResetPasswordImpl resetPassword;

    @Test
    void resetPassword_whenPasswordsDoNotMatch_shouldReturnEmpty() {
        ResetPasswordRequestDTO request =
                UserTestFactory.resetPasswordRequest(1L, "nueva123", "distinta123");

        Optional<User> result = resetPassword.resetPassword(request);

        assertTrue(result.isEmpty());
        verify(userAdapter, never()).updateUser(any());
    }

    @Test
    void resetPassword_whenUserExists_shouldUpdatePassword() {
        User user = UserTestFactory.user(1L, "manuela@test.com");
        ResetPasswordRequestDTO request =
                UserTestFactory.resetPasswordRequest(1L, "nueva123", "nueva123");
        User updatedUser = UserTestFactory.user(1L, "manuela@test.com");
        updatedUser.setPassword("nueva123");

        when(userAdapter.getUserById(1L)).thenReturn(Optional.of(user));
        when(userAdapter.updateUser(user)).thenReturn(updatedUser);

        Optional<User> result = resetPassword.resetPassword(request);

        assertTrue(result.isPresent());
        assertEquals("nueva123", user.getPassword());
        verify(userAdapter).updateUser(user);
    }

    @Test
    void resetPassword_whenUserNotFound_shouldReturnEmpty() {
        ResetPasswordRequestDTO request =
                UserTestFactory.resetPasswordRequest(99L, "nueva123", "nueva123");

        when(userAdapter.getUserById(99L)).thenReturn(Optional.empty());

        Optional<User> result = resetPassword.resetPassword(request);

        assertTrue(result.isEmpty());
        verify(userAdapter, never()).updateUser(any());
    }
}
