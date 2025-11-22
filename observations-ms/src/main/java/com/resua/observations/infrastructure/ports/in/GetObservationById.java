package com.resua.observations.infrastructure.ports.in;

import com.resua.observations.domain.models.Register;

import java.util.Optional;

public interface GetObservationById {

    Optional<Register> getObservationById(Long id);

}

