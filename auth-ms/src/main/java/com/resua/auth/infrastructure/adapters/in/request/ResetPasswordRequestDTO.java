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
@Schema(description = "Datos para restablecer la contraseña del usuario")
public class ResetPasswordRequestDTO {

    @Schema(description = "ID del usuario", example = "8", required = true)
    private Long userId;

    @Schema(description = "Nueva contraseña", example = "nuevaPassword123", required = true)
    private String newPassword;

    @Schema(description = "Confirmación de nueva contraseña", example = "nuevaPassword123", required = true)
    private String confirmPassword;
}

