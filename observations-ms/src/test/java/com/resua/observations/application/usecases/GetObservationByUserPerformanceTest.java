package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.support.ObservationTestFactory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetObservationByUserPerformanceTest {

  private static final int LIST_SIZE = 2_000;
  private static final long MAX_MILLIS = 200L;

  @Mock
  private RegisterAdapter registerAdapter;

  @InjectMocks
  private GetObservationByUserImpl getObservationByUser;

  @Test
  void getObservationsByUser_withLargeList_shouldCompleteWithinTimeLimit() {
    List<Register> largeList = new ArrayList<>(LIST_SIZE);
    for (long i = 1; i <= LIST_SIZE; i++) {
      largeList.add(ObservationTestFactory.savedRegister(i));
    }
    when(registerAdapter.getObservationsByUser(1L)).thenReturn(largeList);

    long start = System.currentTimeMillis();
    List<Register> result = getObservationByUser.getObservationsByUser(1L);
    long elapsed = System.currentTimeMillis() - start;

    assertEquals(LIST_SIZE, result.size());
    assertTrue(elapsed < MAX_MILLIS, "La consulta tardó " + elapsed + " ms (límite: " + MAX_MILLIS + " ms)");
  }
}
