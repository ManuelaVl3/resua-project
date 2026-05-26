package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.support.ObservationTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateObservationImplTest {

    @Mock
    private RegisterAdapter registerAdapter;

    @InjectMocks
    private UpdateObservationImpl updateObservation;

    @Test
    void updateObservation_whenExists_shouldUpdateFields() {
        Register existing = ObservationTestFactory.savedRegister(4L);
        ObservationRequestDTO request = ObservationTestFactory.observationRequest();
        request.setDescription("Descripción actualizada");
        Register updated = ObservationTestFactory.savedRegister(4L);
        updated.setDescription("Descripción actualizada");

        when(registerAdapter.getObservationById(4L)).thenReturn(Optional.of(existing));
        when(registerAdapter.updateObservation(any(Register.class))).thenReturn(updated);

        Optional<Register> result = updateObservation.updateObservation(4L, request);

        assertTrue(result.isPresent());
        assertEquals("Descripción actualizada", result.get().getDescription());
        verify(registerAdapter).updateObservation(any(Register.class));
    }

    @Test
    void updateObservation_whenNotFound_shouldReturnEmpty() {
        when(registerAdapter.getObservationById(99L)).thenReturn(Optional.empty());

        Optional<Register> result = updateObservation.updateObservation(99L, ObservationTestFactory.observationRequest());

        assertTrue(result.isEmpty());
    }
}
