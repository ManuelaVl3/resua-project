package com.resua.community.infrastructure.output.client;

import com.resua.community.infrastructure.output.client.dto.AuthValidationResponseDTO;
import com.resua.community.infrastructure.output.client.dto.UserResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "auth-ms", url = "${services.auth.url}")
public interface AuthClient {

    /**
     * Valida el token JWT y obtiene la información del usuario autenticado
     * @param authorization Header con el token JWT (Bearer token)
     * @return Respuesta con userId, email, valid y message
     */
    @GetMapping("/auth/validate")
    AuthValidationResponseDTO validateToken(@RequestHeader("Authorization") String authorization);

    /**
     * Obtiene información de un usuario por ID
     * @param userId ID del usuario
     * @return Información del usuario
     */
    @GetMapping("/user")
    ResponseEntity<UserResponseDTO> getUserById(@RequestParam("id") Long userId);
}

