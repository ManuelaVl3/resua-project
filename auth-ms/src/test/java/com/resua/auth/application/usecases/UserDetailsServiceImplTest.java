package com.resua.auth.application.usecases;

import com.resua.auth.infrastructure.adapters.out.database.entities.UserEntity;
import com.resua.auth.infrastructure.ports.out.database.UserRepository;
import com.resua.auth.support.UserTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserDetailsServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @Test
    void loadUserByUsername_whenUserExists_shouldReturnUserDetails() {
        UserEntity entity = UserTestFactory.userEntity("manuela@test.com");
        when(userRepository.findUserByEmail("manuela@test.com")).thenReturn(Optional.of(entity));

        UserDetails userDetails = userDetailsService.loadUserByUsername("manuela@test.com");

        assertEquals("manuela@test.com", userDetails.getUsername());
        assertEquals(entity.getPassword(), userDetails.getPassword());
        assertEquals(1, userDetails.getAuthorities().size());
    }

    @Test
    void loadUserByUsername_whenUserNotFound_shouldThrowException() {
        when(userRepository.findUserByEmail("noexiste@test.com")).thenReturn(Optional.empty());

        assertThrows(
                UsernameNotFoundException.class,
                () -> userDetailsService.loadUserByUsername("noexiste@test.com")
        );
    }
}
