package com.resua.auth.infrastructure.services.jwt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtServiceTest {

    private static final String TEST_SECRET =
            "B8/aV2WyX9TCH+r0hLSOdZl4f5k6bEwnxJ3qM/o2u+A3cR9gHlV7yK0pLwU8iZ/jI+eS6wY5nB7tD/fRz8kE/g==";

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "SECRET_KEY", TEST_SECRET);
        ReflectionTestUtils.setField(jwtService, "EXPIRATION_TIME", 86_400_000L);
    }

    @Test
    void generateToken_shouldReturnNonEmptyToken() {
        UserDetails userDetails = userDetails("manuela@test.com");

        String token = jwtService.generateToken(userDetails);

        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    void extractUsername_shouldReturnEmailFromToken() {
        UserDetails userDetails = userDetails("manuela@test.com");
        String token = jwtService.generateToken(userDetails);

        String username = jwtService.extractUsername(token);

        assertEquals("manuela@test.com", username);
    }

    @Test
    void isTokenValid_withMatchingUserDetails_shouldReturnTrue() {
        UserDetails userDetails = userDetails("manuela@test.com");
        String token = jwtService.generateToken(userDetails);

        assertTrue(jwtService.isTokenValid(token, userDetails));
    }

    @Test
    void isTokenValid_withDifferentUser_shouldReturnFalse() {
        UserDetails owner = userDetails("manuela@test.com");
        UserDetails other = userDetails("otro@test.com");
        String token = jwtService.generateToken(owner);

        assertFalse(jwtService.isTokenValid(token, other));
    }

    @Test
    void isTokenValid_withoutUserDetails_shouldReturnTrueForFreshToken() {
        UserDetails userDetails = userDetails("manuela@test.com");
        String token = jwtService.generateToken(userDetails);

        assertTrue(jwtService.isTokenValid(token));
    }

    @Test
    void isTokenValid_withMalformedToken_shouldReturnFalse() {
        assertFalse(jwtService.isTokenValid("token-invalido"));
    }

    private UserDetails userDetails(String email) {
        return new User(email, "password", List.of());
    }
}
