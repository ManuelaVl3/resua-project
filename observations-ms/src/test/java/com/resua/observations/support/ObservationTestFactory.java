package com.resua.observations.support;

import com.resua.observations.domain.models.Location;
import com.resua.observations.domain.models.Register;
import com.resua.observations.domain.models.Species;
import com.resua.observations.infrastructure.adapters.in.request.ImageRequestDTO;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;

import java.util.List;

public final class ObservationTestFactory {

    private ObservationTestFactory() {
    }

    public static ObservationRequestDTO observationRequest() {
        ObservationRequestDTO dto = new ObservationRequestDTO();
        dto.setUserId(1L);
        dto.setCommonName("Rana de Cristal");
        dto.setScientificName("Espadarana prosoblepon");
        dto.setLongitude(-74.072092);
        dto.setLatitude(4.710989);
        dto.setLocation("El Modelo, Medellín");
        dto.setDescription("Observada cerca del río");
        return dto;
    }

    public static ObservationRequestDTO observationRequestWithImage() {
        ObservationRequestDTO dto = observationRequest();
        ImageRequestDTO image = new ImageRequestDTO();
        image.setImageOrder(1);
        image.setImageData("data:image/jpeg;base64," + java.util.Base64.getEncoder().encodeToString("fake-image".getBytes()));
        dto.setImages(List.of(image));
        return dto;
    }

    public static Register savedRegister(Long id) {
        Species species = Species.builder()
                .id(10L)
                .commonName("Rana de Cristal")
                .scientificName("Espadarana prosoblepon")
                .build();
        Location location = Location.builder()
                .id(20L)
                .longitude(-74.072092)
                .latitude(4.710989)
                .location("El Modelo, Medellín")
                .build();
        return Register.builder()
                .id(id)
                .userId(1L)
                .species(species)
                .location(location)
                .description("Observada cerca del río")
                .build();
    }
}
