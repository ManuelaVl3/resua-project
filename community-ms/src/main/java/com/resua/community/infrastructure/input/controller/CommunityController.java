package com.resua.community.infrastructure.input.controller;

import com.resua.community.domain.usecase.CreateCommentUseCase;
import com.resua.community.domain.usecase.DeleteCommentUseCase;
import com.resua.community.domain.usecase.GetCommentsUseCase;
import com.resua.community.infrastructure.input.request.CommunityRequestDTO;
import com.resua.community.infrastructure.input.response.CommentResponseDTO;
import com.resua.community.infrastructure.input.response.GenericResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("community")
@Tag(name = "Community", description = "API para gestión de comentarios en la comunidad")
@RequiredArgsConstructor
@Slf4j
public class CommunityController {

    private final CreateCommentUseCase createCommentUseCase;
    private final GetCommentsUseCase getCommentsUseCase;
    private final DeleteCommentUseCase deleteCommentUseCase;

    @Operation(
            summary = "Crear un nuevo comentario",
            description = "Permite agregar un nuevo comentario a una observación específica en la comunidad. " +
                    "El userId se obtiene automáticamente del token JWT en el header Authorization."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Comentario creado exitosamente",
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
    @PostMapping
    public ResponseEntity<GenericResponseDTO> add(
            @RequestBody CommunityRequestDTO communityR,
            HttpServletRequest request) {
        
        log.info("Recibida petición para crear comentario. ObservationId: {}", communityR.getObservationId());
        
        String userId = (String) request.getAttribute("userId");
        
        if (userId == null) {
            log.warn("Usuario no autenticado al intentar crear comentario");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new GenericResponseDTO("Usuario no autenticado"));
        }

        try {
            log.info("Creando comentario para observationId: {}, userId: {}", communityR.getObservationId(), userId);
            createCommentUseCase.execute(communityR, userId);
            
            log.info("Comentario creado exitosamente para observationId: {}", communityR.getObservationId());
            
            try {
                GenericResponseDTO response = new GenericResponseDTO("El registro se ha agregado correctamente");
                log.debug("Respuesta creada exitosamente");
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                log.error("Error al crear respuesta HTTP: {}", e.getMessage(), e);
                // Aunque haya error al crear la respuesta, el comentario ya se guardó
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new GenericResponseDTO("El comentario se guardó pero hubo un error al generar la respuesta"));
            }
        } catch (IllegalArgumentException e) {
            log.warn("Error de validación al crear comentario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new GenericResponseDTO(e.getMessage()));
        } catch (RuntimeException e) {
            log.error("Error de runtime al crear comentario: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GenericResponseDTO("Error al crear el comentario: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Error inesperado al crear comentario: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GenericResponseDTO("Error al crear el comentario: " + e.getMessage()));
        }
    }

    @Operation(
            summary = "Obtener comentarios de un registro",
            description = "Obtiene todos los comentarios de una observación específica, ordenados por fecha de creación"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Comentarios obtenidos exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CommentResponseDTO.class)
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
    @GetMapping
    public ResponseEntity<List<CommentResponseDTO>> getComment(@RequestParam("observation_id") Long observationId) {
        try {
            List<CommentResponseDTO> comments = getCommentsUseCase.execute(observationId);
            log.info("Retornando {} comentarios para observationId {}", comments.size(), observationId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            log.error("Error al obtener comentarios para observationId {}: {}", observationId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(List.of());
        }
    }

    @Operation(
            summary = "Eliminar un comentario",
            description = "Elimina un comentario. Solo el autor del comentario puede eliminarlo."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Comentario eliminado exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = GenericResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "El comentario no existe o no tienes permiso para eliminarlo",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Usuario no autenticado",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content
            )
    })
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<GenericResponseDTO> deleteComment(
            @PathVariable("commentId") Long commentId,
            HttpServletRequest request) {
        
        log.info("Recibida petición para eliminar comentario con ID: {}", commentId);
        String userId = (String) request.getAttribute("userId");
        
        if (userId == null) {
            log.warn("Usuario no autenticado al intentar eliminar comentario {}", commentId);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new GenericResponseDTO("Usuario no autenticado"));
        }

        try {
            log.info("Eliminando comentario {} por usuario {}", commentId, userId);
            deleteCommentUseCase.execute(commentId, userId);
            
            log.info("Comentario {} eliminado exitosamente", commentId);
            GenericResponseDTO response = new GenericResponseDTO("Comentario eliminado exitosamente");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            log.warn("Error de validación al eliminar comentario {}: {}", commentId, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new GenericResponseDTO(e.getMessage()));
        } catch (Exception e) {
            log.error("Error inesperado al eliminar comentario {}: {}", commentId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new GenericResponseDTO("Error al eliminar el comentario: " + e.getMessage()));
        }
    }
}
