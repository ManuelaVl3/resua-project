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
@Schema(description = "DTO para crear un reporte en un registro publicado")
public class ReportRequestDTO {

    @Schema(description = "Razón por la que se reporta el registro", example = "Contenido engañoso", required = true)
    private String reason;
}
