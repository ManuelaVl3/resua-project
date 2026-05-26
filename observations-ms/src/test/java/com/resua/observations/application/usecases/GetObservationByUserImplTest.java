package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.support.ObservationTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetObservationByUserImplTest {

    @Mock
    private RegisterAdapter registerAdapter;

    @InjectMocks
    private GetObservationByUserImpl getObservationByUser;

    @Test
    void getObservationsByUser_shouldReturnUserRegisters() {
        List<Register> registers = List.of(
                ObservationTestFactory.savedRegister(1L),
                ObservationTestFactory.savedRegister(2L)
        );
        when(registerAdapter.getObservationsByUser(7L)).thenReturn(registers);

        List<Register> result = getObservationByUser.getObservationsByUser(7L);

        assertEquals(2, result.size());
        assertEquals(registers, result);
    }

    @Test
    void getObservationsByUser_whenNoResults_shouldReturnEmptyList() {
        when(registerAdapter.getObservationsByUser(7L)).thenReturn(List.of());

        List<Register> result = getObservationByUser.getObservationsByUser(7L);

        assertTrue(result.isEmpty());
    }
}
