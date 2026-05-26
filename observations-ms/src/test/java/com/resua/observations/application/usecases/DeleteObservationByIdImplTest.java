package com.resua.observations.application.usecases;

import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DeleteObservationByIdImplTest {

    @Mock
    private RegisterAdapter registerAdapter;

    @InjectMocks
    private DeleteObservationByIdImpl deleteObservationById;

    @Test
    void deleteObservationById_whenExists_shouldReturnTrue() {
        when(registerAdapter.deleteObservationById(5L)).thenReturn(true);

        assertTrue(deleteObservationById.deleteObservationById(5L));
    }

    @Test
    void deleteObservationById_whenNotFound_shouldReturnFalse() {
        when(registerAdapter.deleteObservationById(99L)).thenReturn(false);

        assertFalse(deleteObservationById.deleteObservationById(99L));
    }
}
