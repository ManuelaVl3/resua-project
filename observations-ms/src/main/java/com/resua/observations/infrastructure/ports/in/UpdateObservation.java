package com.resua.observations.infrastructure.ports.in;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;

import java.util.Optional;

public interface UpdateObservation {

    Optional<Register> updateObservation(Long id, ObservationRequestDTO observationDTO);

}

