package com.resua.observations.infrastructure.adapters.in.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Datos de imagen en base64")
public class ImageRequestDTO {
    
    @Schema(description = "Imagen en formato base64", example = "data:image/jpeg;base64,/9j/4AAQSkZJRg...")
    private String imageData;
    
    @Schema(description = "Orden de la imagen", example = "1")
    private Integer imageOrder;
}

