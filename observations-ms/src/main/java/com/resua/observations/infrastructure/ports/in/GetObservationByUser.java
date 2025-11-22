package com.resua.observations.infrastructure.ports.in;

import com.resua.observations.domain.models.Register;

import java.util.List;

public interface GetObservationByUser {

    List<Register> getObservationsByUser(Long userId);

}
