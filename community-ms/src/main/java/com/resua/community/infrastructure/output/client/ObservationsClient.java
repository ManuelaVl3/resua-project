package com.resua.community.infrastructure.output.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "observations-ms", url = "${services.observations.url}")
public interface ObservationsClient {

    /**
     * Obtiene una observación por ID
     * @param observationId ID de la observación
     * @return ResponseEntity con la observación si existe, o 404 si no existe
     */
    @GetMapping("/observations")
    ResponseEntity<Object> getObservationById(@RequestParam("id") Long observationId);
}

