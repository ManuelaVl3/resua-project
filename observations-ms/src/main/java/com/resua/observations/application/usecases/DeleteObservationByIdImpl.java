package com.resua.observations.application.usecases;

import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.infrastructure.ports.in.DeleteObservationById;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteObservationByIdImpl implements DeleteObservationById {

    private final RegisterAdapter registerAdapter;

    @Override
    public boolean deleteObservationById(Long id) {
        return registerAdapter.deleteObservationById(id);
    }
}

