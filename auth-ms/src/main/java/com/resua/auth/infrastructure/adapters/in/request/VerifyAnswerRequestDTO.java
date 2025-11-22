package com.resua.auth.infrastructure.adapters.in.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Datos para verificar la respuesta secreta del usuario")
public class VerifyAnswerRequestDTO {

    @Schema(description = "ID del usuario", example = "8", required = true)
    private Long userId;

    @Schema(description = "Respuesta secreta", example = "Pizza", required = true)
    private String secretAnswer;
}

