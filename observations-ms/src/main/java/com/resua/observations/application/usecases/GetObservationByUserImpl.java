package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.infrastructure.adapters.out.database.entities.RegisterEntity;
import com.resua.observations.infrastructure.adapters.out.database.mappers.RegisterMapper;
import com.resua.observations.infrastructure.ports.in.GetObservationByUser;
import com.resua.observations.infrastructure.ports.out.database.RegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetObservationByUserImpl implements GetObservationByUser {

    private final RegisterAdapter registerAdapter;

    @Override
    public List<Register> getObservationsByUser(Long userId) {

        return registerAdapter.getObservationsByUser(userId);
    }
}
