package com.resua.observations.infrastructure.adapters.in.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Respuesta de la operación de observación")
public class GenericResponseDTO {
    
    @Schema(description = "Mensaje de confirmación de la operación", example = "El registro se ha agregado correctamente")
    private String message;
}
