package com.resua.auth.application.usecases;

import com.resua.auth.infrastructure.adapters.in.request.LoginRequestDTO;
import com.resua.auth.infrastructure.adapters.in.response.LoginResponseDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.services.jwt.JwtService;
import com.resua.auth.support.UserTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginUserImplTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private UserAdapter userAdapter;

    @InjectMocks
    private LoginUserImpl loginUser;

    @Test
    void login_withValidCredentials_shouldReturnLoginResponse() {
        LoginRequestDTO request = new LoginRequestDTO("manuela@test.com", "password123");
        UserDetails userDetails = new User("manuela@test.com", "password123", List.of());
        com.resua.auth.domain.models.User user = UserTestFactory.user(8L, "manuela@test.com");

        when(userDetailsService.loadUserByUsername("manuela@test.com")).thenReturn(userDetails);
        when(jwtService.generateToken(userDetails)).thenReturn("jwt-token");
        when(userAdapter.getUserByEmail("manuela@test.com")).thenReturn(Optional.of(user));

        LoginResponseDTO response = loginUser.login(request);

        assertEquals("Login exitoso", response.getMessage());
        assertEquals(8L, response.getUserId());
        assertEquals("Manuela Vélez", response.getFullName());
        assertEquals("manuela@test.com", response.getEmail());
        assertTrue(response.isSuccess());
        assertEquals("jwt-token", response.getToken());

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtService).generateToken(userDetails);
    }

    @Test
    void login_whenUserNotFoundInAdapter_shouldReturnResponseWithDefaults() {
        LoginRequestDTO request = new LoginRequestDTO("manuela@test.com", "password123");
        UserDetails userDetails = new User("manuela@test.com", "password123", List.of());

        when(userDetailsService.loadUserByUsername("manuela@test.com")).thenReturn(userDetails);
        when(jwtService.generateToken(userDetails)).thenReturn("jwt-token");
        when(userAdapter.getUserByEmail("manuela@test.com")).thenReturn(Optional.empty());

        LoginResponseDTO response = loginUser.login(request);

        assertEquals(0L, response.getUserId());
        assertEquals(" ", response.getFullName());
        assertEquals("", response.getEmail());
        assertNotNull(response.getToken());
    }

    @Test
    void login_withInvalidCredentials_shouldThrowAuthenticationException() {
        LoginRequestDTO request = new LoginRequestDTO("manuela@test.com", "wrong");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Credenciales inválidas"));

        assertThrows(BadCredentialsException.class, () -> loginUser.login(request));
    }
}
