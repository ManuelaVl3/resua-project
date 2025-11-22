package com.resua.community.infrastructure.input.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO genérico para respuestas de la API")
public class GenericResponseDTO {
    
    @Schema(description = "Mensaje de respuesta", example = "El registro se ha agregado correctamente")
    private String message;
}
