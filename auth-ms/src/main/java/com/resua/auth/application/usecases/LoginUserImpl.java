package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.LoginRequestDTO;
import com.resua.auth.infrastructure.adapters.in.response.LoginResponseDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.ports.in.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import com.resua.auth.infrastructure.services.jwt.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginUserImpl implements LoginUser {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserAdapter userAdapter;

    @Override
    public LoginResponseDTO login(LoginRequestDTO loginRequest) throws AuthenticationException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

        String token = jwtService.generateToken(userDetails);

        // Obtener los datos del usuario para la respuesta
        Optional<User> user = userAdapter.getUserByEmail(loginRequest.getEmail());

        Long id = 0L;
        String name = "";
        String lastName = "";
        String email = "";

        if(user.isPresent()){
            id = user.get().getId();
            name = user.get().getName();
            lastName = user.get().getLastName();
            email = user.get().getEmail();
        }

        return new LoginResponseDTO(
                "Login exitoso",
                id,
                name + " " + lastName,
                email,
                true,
                token
        );
    }
}

