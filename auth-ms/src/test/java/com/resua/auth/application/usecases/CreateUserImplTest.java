package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.RegistrationRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.support.UserTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateUserImplTest {

    @Mock
    private UserAdapter userAdapter;

    @InjectMocks
    private CreateUserImpl createUser;

    @Test
    void createUser_shouldMapDtoAndDelegateToAdapter() {
        RegistrationRequestDTO request = UserTestFactory.registrationRequest();
        User savedUser = UserTestFactory.user(1L, request.getEmail());

        when(userAdapter.createUser(any(User.class))).thenReturn(savedUser);

        User result = createUser.createUser(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userAdapter).createUser(userCaptor.capture());

        User captured = userCaptor.getValue();
        assertEquals(request.getName(), captured.getName());
        assertEquals(request.getLastName(), captured.getLastName());
        assertEquals(request.getEmail(), captured.getEmail());
        assertEquals(request.getPassword(), captured.getPassword());
        assertEquals(request.getSecurityQuestion(), captured.getSecurityQuestion());
        assertEquals(request.getSecretAnswer(), captured.getSecretAnswer());
        assertEquals(savedUser, result);
    }
}
