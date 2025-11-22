package com.resua.auth.infrastructure.ports.in;

import com.resua.auth.infrastructure.adapters.in.request.VerifyAnswerRequestDTO;

public interface VerifySecretAnswer {

    boolean verifyAnswer(VerifyAnswerRequestDTO verifyRequest);
}

