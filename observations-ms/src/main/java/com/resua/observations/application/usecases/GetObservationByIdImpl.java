package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.infrastructure.ports.in.GetObservationById;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetObservationByIdImpl implements GetObservationById {

    private final RegisterAdapter registerAdapter;

    @Override
    public Optional<Register> getObservationById(Long id) {
        return registerAdapter.getObservationById(id);
    }
}

