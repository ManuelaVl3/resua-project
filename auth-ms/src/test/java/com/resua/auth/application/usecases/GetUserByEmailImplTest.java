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
class GetUserByEmailImplTest {

    @Mock
    private UserAdapter userAdapter;

    @InjectMocks
    private GetUserByEmailImpl getUserByEmail;

    @Test
    void getUserByEmail_whenExists_shouldReturnUser() {
        User user = UserTestFactory.user(1L, "manuela@test.com");
        when(userAdapter.getUserByEmail("manuela@test.com")).thenReturn(Optional.of(user));

        Optional<User> result = getUserByEmail.getUserByEmail("manuela@test.com");

        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    void getUserByEmail_whenNotFound_shouldReturnEmpty() {
        when(userAdapter.getUserByEmail("noexiste@test.com")).thenReturn(Optional.empty());

        Optional<User> result = getUserByEmail.getUserByEmail("noexiste@test.com");

        assertTrue(result.isEmpty());
    }
}
