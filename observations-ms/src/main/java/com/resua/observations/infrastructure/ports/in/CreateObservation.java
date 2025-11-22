package com.resua.observations.infrastructure.ports.in;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;

public interface CreateObservation {

    Register createObservation(ObservationRequestDTO observationDTO);

}

