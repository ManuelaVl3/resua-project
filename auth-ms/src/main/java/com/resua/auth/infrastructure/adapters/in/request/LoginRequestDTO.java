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
@Schema(description = "Datos para autenticar a un usuario")
public class LoginRequestDTO {
    @Schema(description = "Email", example = "manuela@gmail.com", required = true)
    private String email;

    @Schema(description = "Password", example = "123456789", required = true)
    private String password;
}
