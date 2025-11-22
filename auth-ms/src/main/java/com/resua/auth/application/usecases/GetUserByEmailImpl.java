package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.ports.in.GetUserByEmail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetUserByEmailImpl implements GetUserByEmail {

    private final UserAdapter userAdapter;

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userAdapter.getUserByEmail(email);
    }
}

