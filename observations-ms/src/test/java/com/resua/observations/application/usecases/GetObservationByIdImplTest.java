package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Register;
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
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetObservationByIdImplTest {

    @Mock
    private RegisterAdapter registerAdapter;

    @InjectMocks
    private GetObservationByIdImpl getObservationById;

    @Test
    void getObservationById_whenExists_shouldReturnRegister() {
        Register register = ObservationTestFactory.savedRegister(3L);
        when(registerAdapter.getObservationById(3L)).thenReturn(Optional.of(register));

        Optional<Register> result = getObservationById.getObservationById(3L);

        assertTrue(result.isPresent());
        assertEquals(register, result.get());
    }

    @Test
    void getObservationById_whenNotFound_shouldReturnEmpty() {
        when(registerAdapter.getObservationById(99L)).thenReturn(Optional.empty());

        Optional<Register> result = getObservationById.getObservationById(99L);

        assertTrue(result.isEmpty());
    }
}
