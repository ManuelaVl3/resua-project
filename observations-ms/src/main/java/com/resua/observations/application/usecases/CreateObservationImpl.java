package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Location;
import com.resua.observations.domain.models.Register;
import com.resua.observations.domain.models.RegisterImage;
import com.resua.observations.domain.models.Species;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.infrastructure.ports.in.CreateObservation;
import com.resua.observations.infrastructure.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateObservationImpl implements CreateObservation {

    private final RegisterAdapter registerAdapter;
    private final S3Service s3Service;

    @Override
    public Register createObservation(ObservationRequestDTO observationDTO) {
        Species species = Species.builder()
                .commonName(observationDTO.getCommonName())
                .scientificName(observationDTO.getScientificName())
                .build();
        
        Location location = Location.builder()
                .longitude(observationDTO.getLongitude())
                .latitude(observationDTO.getLatitude())
                .location(observationDTO.getLocation())
                .build();
        
        Register register = Register.builder()
                .userId(observationDTO.getUserId())
                .species(species)
                .location(location)
                .description(observationDTO.getDescription())
                .images(null)
                .build();
        
        Register savedRegister = registerAdapter.createObservation(register);
        
        if (observationDTO.getImages() != null && !observationDTO.getImages().isEmpty()) {
            List<RegisterImage> imageList = new ArrayList<>();
            
            for (var imageDTO : observationDTO.getImages()) {
                String imageUrl = s3Service.uploadImage(
                        imageDTO.getImageData(),
                        savedRegister.getUserId(),
                        savedRegister.getId(),
                        imageDTO.getImageOrder()
                );
                
                RegisterImage registerImage = RegisterImage.builder()
                        .imageUrl(imageUrl)
                        .imageOrder(imageDTO.getImageOrder())
                        .createdAt(LocalDateTime.now())
                        .build();
                
                imageList.add(registerImage);
            }
            
            savedRegister.setImages(imageList);
            savedRegister = registerAdapter.updateObservation(savedRegister);
        }
        
        return savedRegister;
    }
}

