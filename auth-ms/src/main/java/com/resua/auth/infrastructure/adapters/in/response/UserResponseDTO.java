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
@Schema(description = "Datos para mostrar información de un usuario")
public class UserResponseDTO {

    @Schema(description = "Nombre", example = "Sebastian", required = true)
    private String name;

    @Schema(description = "Apellido", example = "Cruz", required = true)
    private String lastName;

    @Schema(description = "Email", example = "sebascruz@email.com", required = true)
    private String email;

    @Schema(description = "Pregunta de seguridad", example = "¿Cuál es tu comida favorita?", required = true)
    private String securityQuestion;

    @Schema(description = "Respuesta secreta", example = "Pizza", required = true)
    private String secretAnswer;
}
