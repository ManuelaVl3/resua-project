package com.resua.community.infrastructure.input.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO para crear un nuevo comentario en la comunidad")
public class CommunityRequestDTO {
    
    @Schema(description = "Descripción del comentario", example = "Esta especie la avisté la semana pasada en " +
            "el mismo lugar", required = true)
    private String description;
    
    @Schema(description = "ID de la observación a la que pertenece el comentario", example = "33", required = true)
    private Long observationId;

}
