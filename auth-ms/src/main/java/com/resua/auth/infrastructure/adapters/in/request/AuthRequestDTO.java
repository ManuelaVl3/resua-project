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
public class AuthRequestDTO {

    @Schema(description = "Nombre", example = "Manuela Vélez Betancourt", required = true)
    private String name;

    @Schema(description = "Email", example = "manuela@gmail.com", required = true)
    private String email;

    @Schema(description = "Password", example = "123456789", required = true)
    private String password;

    @Schema(description = "Profession", example = "Bióloga", required = true)
    private String profession;
}
