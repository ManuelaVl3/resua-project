package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.ports.in.GetUserById;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetUserByIdImpl implements GetUserById {

    private final UserAdapter userAdapter;

    @Override
    public Optional<User> getUserById(Long userId) {
        return userAdapter.getUserById(userId);
    }
}

