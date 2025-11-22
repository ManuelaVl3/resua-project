package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Location;
import com.resua.observations.domain.models.Register;
import com.resua.observations.domain.models.Species;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.infrastructure.ports.in.UpdateObservation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UpdateObservationImpl implements UpdateObservation {

    private final RegisterAdapter registerAdapter;

    @Override
    public Optional<Register> updateObservation(Long id, ObservationRequestDTO observationDTO) {
        Optional<Register> existingRegisterOpt = registerAdapter.getObservationById(id);
        
        if (existingRegisterOpt.isEmpty()) {
            return Optional.empty();
        }
        
        Register existingRegister = existingRegisterOpt.get();
        
        Species updatedSpecies = Species.builder()
                .id(existingRegister.getSpecies().getId())
                .commonName(observationDTO.getCommonName() != null ? 
                        observationDTO.getCommonName() : existingRegister.getSpecies().getCommonName())
                .scientificName(observationDTO.getScientificName() != null ? 
                        observationDTO.getScientificName() : existingRegister.getSpecies().getScientificName())
                .createdAt(existingRegister.getSpecies().getCreatedAt())
                .build();
        
        Location updatedLocation = Location.builder()
                .id(existingRegister.getLocation().getId())
                .longitude(observationDTO.getLongitude() != null ? 
                        observationDTO.getLongitude() : existingRegister.getLocation().getLongitude())
                .latitude(observationDTO.getLatitude() != null ? 
                        observationDTO.getLatitude() : existingRegister.getLocation().getLatitude())
                .location(observationDTO.getLocation() != null ? 
                        observationDTO.getLocation() : existingRegister.getLocation().getLocation())
                .createdAt(existingRegister.getLocation().getCreatedAt())
                .build();
        
        Register updatedRegister = Register.builder()
                .id(existingRegister.getId())
                .userId(observationDTO.getUserId() != null ? 
                        observationDTO.getUserId() : existingRegister.getUserId())
                .species(updatedSpecies)
                .location(updatedLocation)
                .description(observationDTO.getDescription() != null ? 
                        observationDTO.getDescription() : existingRegister.getDescription())
                .images(existingRegister.getImages())
                .createdAt(existingRegister.getCreatedAt())
                .build();
        
        Register savedRegister = registerAdapter.updateObservation(updatedRegister);
        return Optional.of(savedRegister);
    }
}

