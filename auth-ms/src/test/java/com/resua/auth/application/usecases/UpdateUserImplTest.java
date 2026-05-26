package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.UpdateUserRequestDTO;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateUserImplTest {

    @Mock
    private UserAdapter userAdapter;

    @InjectMocks
    private UpdateUserImpl updateUser;

    @Test
    void updateUser_shouldApplyOnlyProvidedFields() {
        User existing = UserTestFactory.user(1L, "manuela@test.com");
        UpdateUserRequestDTO request = UserTestFactory.updateUserRequest("NuevoNombre");
        User updated = UserTestFactory.user(1L, "manuela@test.com");
        updated.setName("NuevoNombre");

        when(userAdapter.getUserById(1L)).thenReturn(Optional.of(existing));
        when(userAdapter.updateUser(existing)).thenReturn(updated);

        Optional<User> result = updateUser.updateUser(1L, request);

        assertTrue(result.isPresent());
        assertEquals("NuevoNombre", existing.getName());
        assertEquals("Vélez", existing.getLastName());
        assertEquals("manuela@test.com", existing.getEmail());
        verify(userAdapter).updateUser(existing);
    }

    @Test
    void updateUser_whenUserNotFound_shouldReturnEmpty() {
        UpdateUserRequestDTO request = UserTestFactory.updateUserRequest("NuevoNombre");

        when(userAdapter.getUserById(99L)).thenReturn(Optional.empty());

        Optional<User> result = updateUser.updateUser(99L, request);

        assertTrue(result.isEmpty());
    }
}
