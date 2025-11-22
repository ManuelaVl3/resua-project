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
@Schema(description = "Datos para actualizar un usuario")
public class UpdateUserRequestDTO {

    @Schema(description = "Nombre", example = "Sebastian")
    private String name;

    @Schema(description = "Apellido", example = "Cruz")
    private String lastName;

    @Schema(description = "Email", example = "sebascruz@email.com")
    private String email;

    @Schema(description = "Password", example = "nuevaPassword123")
    private String password;

    @Schema(description = "Pregunta de seguridad", example = "¿Cuál es tu comida favorita?")
    private String securityQuestion;

    @Schema(description = "Respuesta secreta", example = "Pizza")
    private String secretAnswer;
}

