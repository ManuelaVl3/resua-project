package com.resua.auth.infrastructure.adapters.in.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Data;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Respuesta de autenticación de usuario")
public class LoginResponseDTO {

    @Schema(description = "Mensaje de respuesta", example = "Login exitoso")
    private String message;

    @Schema(description = "ID del usuario", example = "8")
    private Long userId;

    @Schema(description = "Nombre completo del usuario", example = "Sebastian Cruz")
    private String fullName;

    @Schema(description = "Email del usuario", example = "sebascruz@email.com")
    private String email;

    @Schema(description = "Indica si el login fue exitoso", example = "true")
    private boolean success;

    @Schema(description = "JWT")
    private String token;
}

