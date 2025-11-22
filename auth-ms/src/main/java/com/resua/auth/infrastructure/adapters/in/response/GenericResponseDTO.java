package com.resua.auth.infrastructure.adapters.in.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Respuesta genérica del sistema")
public class GenericResponseDTO {
    
    @Schema(description = "Mensaje de respuesta", example = "Usuario registrado exitosamente")
    private String message;
}
