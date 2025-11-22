package com.resua.auth.application.usecases;

import com.resua.auth.infrastructure.adapters.in.request.VerifyAnswerRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.infrastructure.ports.in.VerifySecretAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerifySecretAnswerImpl implements VerifySecretAnswer {

    private final UserAdapter userAdapter;

    @Override
    public boolean verifyAnswer(VerifyAnswerRequestDTO verifyRequest) {
        return userAdapter.getUserById(verifyRequest.getUserId())
                .map(user -> user.getSecretAnswer().equalsIgnoreCase(verifyRequest.getSecretAnswer()))
                .orElse(false);
    }
}

