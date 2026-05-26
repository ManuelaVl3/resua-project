package com.resua.observations.application.usecases;

import com.resua.observations.domain.models.Location;
import com.resua.observations.domain.models.Register;
import com.resua.observations.domain.models.RegisterImage;
import com.resua.observations.domain.models.Species;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;
import com.resua.observations.infrastructure.adapters.out.database.RegisterAdapter;
import com.resua.observations.infrastructure.ports.in.CreateObservation;
import com.resua.observations.infrastructure.services.LocalStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreateObservationImpl implements CreateObservation {

    private final RegisterAdapter registerAdapter;
    private final LocalStorageService localStorageService;

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
            try {
                List<RegisterImage> imageList = new ArrayList<>();
                
                for (var imageDTO : observationDTO.getImages()) {
                    try {
                        String imageUrl = localStorageService.uploadImage(
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
                    } catch (Exception e) {
                        log.error("Error al subir imagen individual (orden: {}): {}", 
                                imageDTO.getImageOrder(), e.getMessage());
                        // Continuar con las demás imágenes aunque una falle
                    }
                }
                
                if (!imageList.isEmpty()) {
                    savedRegister.setImages(imageList);
                    savedRegister = registerAdapter.updateObservation(savedRegister);
                } else {
                    log.warn("No se pudo subir ninguna imagen para la observación ID: {}", 
                            savedRegister.getId());
                }
            } catch (Exception e) {
                log.error("Error general al procesar imágenes para la observación ID: {}: {}", 
                        savedRegister.getId(), e.getMessage());
                // No lanzar la excepción, solo loguear el error
                // La observación ya fue creada exitosamente
            }
        }
        
        return savedRegister;
    }
}

