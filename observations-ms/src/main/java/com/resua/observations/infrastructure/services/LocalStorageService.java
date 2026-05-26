package com.resua.observations.infrastructure.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Slf4j
@Service
public class LocalStorageService {

    @Value("${server.servlet.context-path:}")
    private String contextPath;

    @Value("${server.port:8082}")
    private String serverPort;

    private static final String BASE_UPLOAD_DIR = "uploads/observations";

    public String uploadImage(String base64Image, Long userId, Long registerId, Integer imageOrder) {
        try {
            String imageData = base64Image;
            String extension = "jpg";
            
            // Extraer metadata del base64 si existe
            if (base64Image.contains(",")) {
                String[] parts = base64Image.split(",");
                String metadata = parts[0];
                imageData = parts[1];
                
                if (metadata.contains("image/png")) {
                    extension = "png";
                } else if (metadata.contains("image/jpg") || metadata.contains("image/jpeg")) {
                    extension = "jpg";
                } else if (metadata.contains("image/webp")) {
                    extension = "webp";
                }
            }
            
            // Decodificar base64
            byte[] imageBytes = Base64.getDecoder().decode(imageData);
            
            // Crear directorio si no existe
            String userDir = String.format("%s/%d/%d", BASE_UPLOAD_DIR, userId, registerId);
            Path dirPath = Paths.get(userDir);
            Files.createDirectories(dirPath);
            
            // Generar nombre de archivo único
            String fileName = String.format("%s_order%d.%s", 
                    UUID.randomUUID().toString(),
                    imageOrder,
                    extension);
            
            // Guardar archivo
            Path filePath = dirPath.resolve(fileName);
            Files.write(filePath, imageBytes);
            
            // Generar URL de acceso
            String imageUrl = String.format("http://localhost:%s%s/api/images/%d/%d/%s",
                    serverPort,
                    contextPath,
                    userId,
                    registerId,
                    fileName);
            
            log.info("Imagen guardada localmente: {}", imageUrl);
            return imageUrl;
            
        } catch (IOException e) {
            log.error("Error guardando imagen localmente", e);
            throw new RuntimeException("Error guardando imagen localmente: " + e.getMessage());
        }
    }
    
    public byte[] getImage(Long userId, Long registerId, String fileName) throws IOException {
        String imagePath = String.format("%s/%d/%d/%s", BASE_UPLOAD_DIR, userId, registerId, fileName);
        Path path = Paths.get(imagePath);
        
        if (!Files.exists(path)) {
            throw new IOException("Imagen no encontrada");
        }
        
        return Files.readAllBytes(path);
    }
}


