package com.resua.auth.application.usecases;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.VerifyAnswerRequestDTO;
import com.resua.auth.infrastructure.adapters.out.database.UserAdapter;
import com.resua.auth.support.UserTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VerifySecretAnswerImplTest {

    @Mock
    private UserAdapter userAdapter;

    @InjectMocks
    private VerifySecretAnswerImpl verifySecretAnswer;

    @Test
    void verifyAnswer_withCorrectAnswerIgnoringCase_shouldReturnTrue() {
        User user = UserTestFactory.user(1L, "manuela@test.com");
        VerifyAnswerRequestDTO request = UserTestFactory.verifyAnswerRequest(1L, "nicky");

        when(userAdapter.getUserById(1L)).thenReturn(Optional.of(user));

        assertTrue(verifySecretAnswer.verifyAnswer(request));
    }

    @Test
    void verifyAnswer_withWrongAnswer_shouldReturnFalse() {
        User user = UserTestFactory.user(1L, "manuela@test.com");
        VerifyAnswerRequestDTO request = UserTestFactory.verifyAnswerRequest(1L, "incorrecta");

        when(userAdapter.getUserById(1L)).thenReturn(Optional.of(user));

        assertFalse(verifySecretAnswer.verifyAnswer(request));
    }

    @Test
    void verifyAnswer_whenUserNotFound_shouldReturnFalse() {
        VerifyAnswerRequestDTO request = UserTestFactory.verifyAnswerRequest(99L, "nicky");

        when(userAdapter.getUserById(99L)).thenReturn(Optional.empty());

        assertFalse(verifySecretAnswer.verifyAnswer(request));
    }
}
