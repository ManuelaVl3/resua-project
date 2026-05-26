package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
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
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetUserByIdImplTest {

    @Mock
    private UserAdapter userAdapter;

    @InjectMocks
    private GetUserByIdImpl getUserById;

    @Test
    void getUserById_whenExists_shouldReturnUser() {
        User user = UserTestFactory.user(1L, "manuela@test.com");
        when(userAdapter.getUserById(1L)).thenReturn(Optional.of(user));

        Optional<User> result = getUserById.getUserById(1L);

        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    void getUserById_whenNotFound_shouldReturnEmpty() {
        when(userAdapter.getUserById(99L)).thenReturn(Optional.empty());

        Optional<User> result = getUserById.getUserById(99L);

        assertTrue(result.isEmpty());
    }
}
