package com.resua.observations.infrastructure.adapters.in.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Datos para mostrar observaciones de especies silvestres")
public class ObservationResponseDTO {

    @Schema(description = "Nombre común de la especie", example = "Rana de Cristal", required = true)
    private String commonName;

    @Schema(description = "Nombre científico de la especie", example = "Espadarana Prosoblepon", required = true)
    private String speciesName;

    @Schema(description = "Dirección o ubicación donde se realizó la observación", example = "El modelo", required = true)
    private String address;
}
