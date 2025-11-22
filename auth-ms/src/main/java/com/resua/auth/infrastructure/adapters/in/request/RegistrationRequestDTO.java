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
@Schema(description = "Datos para crear un usuario")
public class RegistrationRequestDTO {

    @Schema(description = "Nombre", example = "Manuela", required = true)
    private String name;

    @Schema(description = "Apellido", example = "Vélez Betancourt", required = true)
    private String lastName;

    @Schema(description = "Email", example = "manuela@gmail.com", required = true)
    private String email;

    @Schema(description = "Password", example = "123456789", required = true)
    private String password;

    @Schema(description = "Pregunta de seguridad",
            example = "Cuál es el nombre de mi primera mascota?", required = true)
    private String securityQuestion;

    @Schema(description = "Respuesta secreta", example = "Nicky", required = true)
    private String secretAnswer;
}
