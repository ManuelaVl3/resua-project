package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.infrastructure.services.LocalStorageService;
import com.resua.observations.support.ObservationTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateObservationImplTest {

    @Mock
    private RegisterAdapter registerAdapter;

    @Mock
    private LocalStorageService localStorageService;

    @InjectMocks
    private CreateObservationImpl createObservation;

    @Test
    void createObservation_withoutImages_shouldPersistRegister() {
        ObservationRequestDTO request = ObservationTestFactory.observationRequest();
        Register saved = ObservationTestFactory.savedRegister(1L);

        when(registerAdapter.createObservation(any(Register.class))).thenReturn(saved);

        Register result = createObservation.createObservation(request);

        ArgumentCaptor<Register> captor = ArgumentCaptor.forClass(Register.class);
        verify(registerAdapter).createObservation(captor.capture());
        verify(registerAdapter, never()).updateObservation(any());
        verify(localStorageService, never()).uploadImage(anyString(), anyLong(), anyLong(), anyInt());

        Register captured = captor.getValue();
        assertEquals(request.getUserId(), captured.getUserId());
        assertEquals(request.getCommonName(), captured.getSpecies().getCommonName());
        assertEquals(request.getScientificName(), captured.getSpecies().getScientificName());
        assertEquals(request.getDescription(), captured.getDescription());
        assertEquals(saved, result);
    }

    @Test
    void createObservation_withImages_shouldUploadAndUpdateRegister() {
        ObservationRequestDTO request = ObservationTestFactory.observationRequestWithImage();
        Register saved = ObservationTestFactory.savedRegister(5L);
        Register updated = ObservationTestFactory.savedRegister(5L);

        when(registerAdapter.createObservation(any(Register.class))).thenReturn(saved);
        when(localStorageService.uploadImage(anyString(), eq(1L), eq(5L), eq(1)))
                .thenReturn("http://localhost:8082/observations-ms/api/images/1/5/file.jpg");
        when(registerAdapter.updateObservation(any(Register.class))).thenReturn(updated);

        Register result = createObservation.createObservation(request);

        verify(localStorageService).uploadImage(anyString(), eq(1L), eq(5L), eq(1));
        verify(registerAdapter, times(1)).updateObservation(any(Register.class));
        assertNotNull(result);
    }
}
