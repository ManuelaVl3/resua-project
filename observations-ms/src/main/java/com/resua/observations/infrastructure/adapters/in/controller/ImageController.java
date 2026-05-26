package com.resua.observations.infrastructure.adapters.in.controller;

import com.resua.observations.infrastructure.services.LocalStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/images")
@Tag(name = "Images", description = "API para servir imágenes de observaciones")
public class ImageController {

    private final LocalStorageService localStorageService;

    @GetMapping("/{userId}/{registerId}/{fileName:.+}")
    @Operation(summary = "Obtener imagen", description = "Sirve una imagen almacenada localmente")
    public ResponseEntity<byte[]> getImage(
            @PathVariable Long userId,
            @PathVariable Long registerId,
            @PathVariable String fileName) {
        try {
            byte[] imageData = localStorageService.getImage(userId, registerId, fileName);
            
            // Determinar el tipo de contenido según la extensión
            MediaType mediaType = MediaType.IMAGE_JPEG;
            if (fileName.endsWith(".png")) {
                mediaType = MediaType.IMAGE_PNG;
            } else if (fileName.endsWith(".webp")) {
                mediaType = MediaType.parseMediaType("image/webp");
            }
            
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(imageData);
                    
        } catch (IOException e) {
            log.error("Error al obtener imagen: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}


