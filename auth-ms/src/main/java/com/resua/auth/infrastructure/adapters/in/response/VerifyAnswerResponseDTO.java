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
@Schema(description = "Respuesta de verificación de respuesta secreta")
public class VerifyAnswerResponseDTO {

    @Schema(description = "Mensaje de respuesta", example = "Respuesta correcta")
    private String message;

    @Schema(description = "Indica si la respuesta es correcta", example = "true")
    private boolean isValid;
}

