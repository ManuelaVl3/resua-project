package com.resua.auth.infrastructure.adapters.in.controller;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.in.request.*;
import com.resua.auth.infrastructure.adapters.in.response.GenericResponseDTO;
import com.resua.auth.infrastructure.adapters.in.response.LoginResponseDTO;
import com.resua.auth.infrastructure.adapters.in.response.SecurityQuestionResponseDTO;
import com.resua.auth.infrastructure.adapters.in.response.UserResponseDTO;
import com.resua.auth.infrastructure.adapters.in.response.ValidateTokenResponseDTO;
import com.resua.auth.infrastructure.adapters.in.response.VerifyAnswerResponseDTO;
import com.resua.auth.infrastructure.ports.in.*;
import com.resua.auth.infrastructure.services.jwt.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping
@Tag(name = "Autenticación", description = "API para gestión de autenticación de usuarios")
public class AuthController {

    private final CreateUser createUser;
    private final LoginUser loginUser;
    private final GetUserById getUserById;
    private final GetUserByEmail getUserByEmail;
    private final UpdateUser updateUser;
    private final VerifySecretAnswer verifySecretAnswer;
    private final ResetPassword resetPassword;
    private final JwtService jwtService;

    @Operation(
            summary = "Registrar nuevo usuario",
            description = "Crea un nuevo usuario en el sistema con la información proporcionada"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuario registrado exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = GenericResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de entrada inválidos",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
    @PostMapping("/user")
    public ResponseEntity<User> add(@RequestBody RegistrationRequestDTO userDTO){
        User createdUser = createUser.createUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }

    @Operation(
            summary = "Autenticación de usuario",
            description = "Autentica a un usuario en el sistema con email y contraseña"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuario autenticado exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Credenciales inválidas",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de entrada inválidos",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
   @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest){
        try {
            LoginResponseDTO response = loginUser.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(
                    new LoginResponseDTO(
                                "Credenciales inválidas",
                                null,
                                null,
                                null,
                                false,
                                null
                        ));
        }
   }

    @Operation(
            summary = "Obtener información de un usuario",
            description = "Obtiene la información de un usuario en el sistema por su ID"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Información de usuario obtenida exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "ID de usuario inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
   @GetMapping("/user")
    public ResponseEntity<UserResponseDTO> getUserInformation(@RequestParam("id") Long userId){
        return getUserById.getUserById(userId)
                .map(user -> {
                    UserResponseDTO response = new UserResponseDTO(
                            user.getName(),
                            user.getLastName(),
                            user.getEmail(),
                            user.getSecurityQuestion(),
                            user.getSecretAnswer()
                    );
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
   }

    @Operation(
            summary = "Editar información de un usuario",
            description = "Actualiza la información de un usuario en el sistema. Solo se actualizan los campos proporcionados."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Información de usuario actualizada exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de entrada inválidos",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
   @PatchMapping("/user/{id}")
    public ResponseEntity<UserResponseDTO> update(@PathVariable("id") Long id, @RequestBody UpdateUserRequestDTO updateRequest){
        return updateUser.updateUser(id, updateRequest)
                .map(user -> {
                    UserResponseDTO response = new UserResponseDTO(
                            user.getName(),
                            user.getLastName(),
                            user.getEmail(),
                            user.getSecurityQuestion(),
                            user.getSecretAnswer()
                    );
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
   }

    @Operation(
            summary = "Obtener pregunta de seguridad por email",
            description = "Obtiene la pregunta de seguridad de un usuario para recuperación de contraseña usando su email"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Pregunta de seguridad obtenida exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = SecurityQuestionResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Email inválido",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
    @GetMapping("/user/question")
    public ResponseEntity<SecurityQuestionResponseDTO> getSecurityQuestionByEmail(@RequestParam("email") String email) {
        return getUserByEmail.getUserByEmail(email)
                .map(user -> {
                    SecurityQuestionResponseDTO response = new SecurityQuestionResponseDTO(
                            user.getSecurityQuestion(),
                            user.getId()
                    );
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Verificar respuesta secreta",
            description = "Verifica si la respuesta secreta proporcionada por el usuario es correcta"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Respuesta verificada",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = VerifyAnswerResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de entrada inválidos",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
    @PostMapping("/user/verify-answer")
    public ResponseEntity<VerifyAnswerResponseDTO> verifySecretAnswer(@RequestBody VerifyAnswerRequestDTO verifyRequest) {
        boolean isValid = verifySecretAnswer.verifyAnswer(verifyRequest);
        
        VerifyAnswerResponseDTO response = new VerifyAnswerResponseDTO(
                isValid ? "Respuesta correcta" : "Respuesta incorrecta",
                isValid
        );

        return ResponseEntity.ok(response);
   }


    @Operation(
            summary = "Restablecer contraseña",
            description = "Restablece la contraseña del usuario después de verificar la respuesta secreta"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Contraseña restablecida exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = GenericResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Las contraseñas no coinciden o datos inválidos",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Usuario no encontrado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
    @PostMapping("/user/reset-password")
    public ResponseEntity<GenericResponseDTO> resetPassword(@RequestBody ResetPasswordRequestDTO resetRequest) {
        return resetPassword.resetPassword(resetRequest)
                .map(user -> {
                    GenericResponseDTO response = new GenericResponseDTO(
                            "Contraseña restablecida exitosamente"
                    );
        return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.badRequest().body(
                        new GenericResponseDTO("Error: Las contraseñas no coinciden o usuario no encontrado")
                ));
    }

    @Operation(
            summary = "Validar token JWT",
            description = "Valida un token JWT y retorna el userId y email del usuario asociado"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Token válido",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ValidateTokenResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token inválido o expirado",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ValidateTokenResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Token no proporcionado",
                    content = @Content
            )
    })
    @GetMapping("/auth/validate")
    public ResponseEntity<ValidateTokenResponseDTO> validateToken(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(
                    new ValidateTokenResponseDTO(
                            null,
                            null,
                            false,
                            "Token no proporcionado o formato inválido"
                    )
            );
        }

        try {
            String token = authHeader.substring(7);
            
            // Validar que el token no esté expirado y sea válido
            if (!jwtService.isTokenValid(token)) {
                return ResponseEntity.status(401).body(
                        new ValidateTokenResponseDTO(
                                null,
                                null,
                                false,
                                "Token inválido o expirado"
                        )
                );
            }

            String email = jwtService.extractUsername(token);
            
            return getUserByEmail.getUserByEmail(email)
                    .map(user -> {
                        ValidateTokenResponseDTO response = new ValidateTokenResponseDTO(
                                user.getId(),
                                user.getEmail(),
                                true,
                                "Token válido"
                        );
                        return ResponseEntity.ok(response);
                    })
                    .orElse(ResponseEntity.status(401).body(
                            new ValidateTokenResponseDTO(
                                    null,
                                    email,
                                    false,
                                    "Usuario no encontrado"
                            )
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(
                    new ValidateTokenResponseDTO(
                            null,
                            null,
                            false,
                            "Error al validar el token: " + e.getMessage()
                    )
            );
        }
    }

}
