package com.resua.observations.infrastructure.adapters.out.database;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.out.database.entities.RegisterEntity;
import com.resua.observations.infrastructure.adapters.out.database.mappers.RegisterMapper;
import com.resua.observations.infrastructure.ports.out.database.RegisterRepository;
import com.resua.observations.support.ObservationTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RegisterAdapterTest {

    @Mock
    private RegisterRepository registerRepository;

    @Mock
    private RegisterMapper registerMapper;

    @InjectMocks
    private RegisterAdapter registerAdapter;

    @Test
    void createObservation_shouldPersistThroughRepository() {
        Register register = ObservationTestFactory.savedRegister(null);
        RegisterEntity entity = new RegisterEntity();
        RegisterEntity savedEntity = new RegisterEntity();
        savedEntity.setId(10L);
        Register savedModel = ObservationTestFactory.savedRegister(10L);

        when(registerMapper.toEntity(any(Register.class))).thenReturn(entity);
        when(registerRepository.save(entity)).thenReturn(savedEntity);
        when(registerMapper.toModel(savedEntity)).thenReturn(savedModel);

        Register result = registerAdapter.createObservation(register);

        ArgumentCaptor<Register> registerCaptor = ArgumentCaptor.forClass(Register.class);
        verify(registerMapper).toEntity(registerCaptor.capture());
        verify(registerRepository).save(entity);

        assertNotNull(registerCaptor.getValue().getCreatedAt());
        assertNotNull(registerCaptor.getValue().getUpdatedAt());
        assertEquals(10L, result.getId());
    }

    @Test
    void deleteObservationById_whenEntityExists_shouldDeleteFromRepository() {
        when(registerRepository.existsById(8L)).thenReturn(true);

        boolean deleted = registerAdapter.deleteObservationById(8L);

        assertTrue(deleted);
        verify(registerRepository).deleteById(8L);
    }
}
