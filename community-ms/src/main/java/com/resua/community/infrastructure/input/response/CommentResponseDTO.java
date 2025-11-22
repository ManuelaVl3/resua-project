package com.resua.community.infrastructure.input.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Datos para mostrar comentarios de un registro")
public class CommentResponseDTO {

    @Schema(description = "ID del comentario", example = "3", required = true)
    private Long id;

    @Schema(description = "ID del usuario que creó el comentario", example = "19", required = true)
    private Long userId;

    @Schema(description = "Nombre del usuario que crea el comentario", example = "Manuela Vélez Betancourt", required = true)
    private String commenterName;

    @Schema(description = "Descripción del comentario", example = "Esta especie la avisté hace dos semanas en " +
            "el mismo lugar", required = true)
    private String description;
}
