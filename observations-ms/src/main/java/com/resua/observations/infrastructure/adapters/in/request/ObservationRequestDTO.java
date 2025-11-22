package com.resua.observations.infrastructure.adapters.in.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Datos para crear o actualizar una observación de especie silvestre")
public class ObservationRequestDTO {
    
    @Schema(description = "ID del usuario que realiza la observación", example = "1")
    private Long userId;
    
    @Schema(description = "Nombre común de la especie", example = "Rana de Cristal")
    private String commonName;
    
    @Schema(description = "Nombre científico de la especie", example = "Espadarana prosoblepon")
    private String scientificName;
    
    @Schema(description = "Longitud de la ubicación", example = "-74.072092")
    private Double longitude;
    
    @Schema(description = "Latitud de la ubicación", example = "4.710989")
    private Double latitude;
    
    @Schema(description = "Dirección o descripción de la ubicación", example = "El Modelo, Medellín")
    private String location;
    
    @Schema(description = "Descripción de la observación", example = "Observada cerca del río, clima húmedo")
    private String description;
    
    @Schema(description = "Lista de imágenes en base64")
    private List<ImageRequestDTO> images;
}
