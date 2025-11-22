package com.resua.community.infrastructure.input.controller;

import com.resua.community.infrastructure.input.request.CommunityRequestDTO;
import com.resua.community.infrastructure.input.request.ReportRequestDTO;
import com.resua.community.infrastructure.input.response.GenericResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("report")
@Tag(name = "Report", description = "API para gestión de reporte de comentarios en registros publicados")
public class ReportController {


    @Operation(
            summary = "Reportar registro publicado",
            description = "Reporta un registro publicado"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Registro reportado exitosamente",
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
    @PostMapping("/{observation_id}")
    public ResponseEntity<GenericResponseDTO> addReport(@RequestBody ReportRequestDTO reportR){
        GenericResponseDTO response = new GenericResponseDTO("El registro se ha reportado correctamente");

        return ResponseEntity.ok(response);
    }
}
