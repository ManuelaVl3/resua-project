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
@Schema(description = "Respuesta con la pregunta de seguridad del usuario")
public class SecurityQuestionResponseDTO {

    @Schema(description = "Pregunta de seguridad", example = "¿Cuál es tu comida favorita?", required = true)
    private String securityQuestion;

    @Schema(description = "ID del usuario", example = "8", required = true)
    private Long userId;
}
