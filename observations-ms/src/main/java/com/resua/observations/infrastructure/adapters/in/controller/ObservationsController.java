package com.resua.observations.infrastructure.adapters.in.controller;

import com.resua.observations.domain.models.Location;
import com.resua.observations.domain.models.Register;
import com.resua.observations.domain.models.Species;
import com.resua.observations.infrastructure.adapters.in.request.ObservationRequestDTO;
import com.resua.observations.infrastructure.adapters.in.response.GenericResponseDTO;
import com.resua.observations.infrastructure.adapters.in.response.ObservationResponseDTO;
import com.resua.observations.infrastructure.ports.in.CreateObservation;
import com.resua.observations.infrastructure.ports.in.DeleteObservationById;
import com.resua.observations.infrastructure.ports.in.GetObservationById;
import com.resua.observations.infrastructure.ports.in.GetObservationByUser;
import com.resua.observations.infrastructure.ports.in.UpdateObservation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("observations")
@Tag(name = "Observations", description = "API para gestionar observaciones de especies silvestres")
public class ObservationsController {

    private final GetObservationByUser getObservationByUser;
    private final GetObservationById getObservationById;
    private final DeleteObservationById deleteObservationById;
    private final CreateObservation createObservation;
    private final UpdateObservation updateObservation;

    @PostMapping
    @Operation(
        summary = "Crear nueva observación",
        description = "Registra una nueva observación de especie silvestre en zona urbana"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Observación creada exitosamente",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Register.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Datos de entrada inválidos"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error interno del servidor"
        )
    })
    public ResponseEntity<Register> add(@RequestBody ObservationRequestDTO observationDTO) {
        Register createdRegister = createObservation.createObservation(observationDTO);
        return ResponseEntity.ok(createdRegister);
    }

    @Operation(
            summary = "Editar una observación",
            description = "Edita una observación de especie silvestre en zona urbana"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Observación editada exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Register.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Observación no encontrada"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de entrada inválidos"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor"
            )
    })
    @PatchMapping("/{id}")
    public ResponseEntity<Register> update(@RequestBody ObservationRequestDTO observationDTO, @PathVariable Long id) {
        return updateObservation.updateObservation(id, observationDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(
            summary = "Eliminar una observación",
            description = "Elimina una observación de especie silvestre en zona urbana"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Observación eliminada exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = GenericResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Observación no encontrada"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor"
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponseDTO> delete(@PathVariable Long id) {
        boolean deleted = deleteObservationById.deleteObservationById(id);
        
        if (deleted) {
            GenericResponseDTO response = new GenericResponseDTO("El registro con id: " + id + " se ha eliminado correctamente");
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }

    @Operation(
            summary = "Obtener observaciones de un usuario",
            description = "Obtiene las observaciones de un usuario"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Observaciones obtenidas exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = GenericResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de entrada inválidos"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor"
            )
    })
    @GetMapping("/user")
    public ResponseEntity<List<Register>> getAllByUserId(@RequestParam("id") Long userId) {

        List<Register> registers = getObservationByUser.getObservationsByUser(userId);

        return ResponseEntity.ok(registers);
    }

    @Operation(
            summary = "Obtener un registro de avistamiento",
            description = "Obtiene un registro de avistamiento por su ID"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Observación obtenida exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Register.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Observación no encontrada"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error interno del servidor"
            )
    })
    @GetMapping
    public ResponseEntity<Register> getObservation(@RequestParam("id") Long id) {
        return getObservationById.getObservationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
