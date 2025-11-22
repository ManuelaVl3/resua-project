package com.resua.observations.infrastructure.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.Base64;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public String uploadImage(String base64Image, Long userId, Long registerId, Integer imageOrder) {
        try {
            String imageData = base64Image;
            String contentType = "image/jpeg";
            
            if (base64Image.contains(",")) {
                String[] parts = base64Image.split(",");
                String metadata = parts[0];
                imageData = parts[1];
                
                if (metadata.contains("image/png")) {
                    contentType = "image/png";
                } else if (metadata.contains("image/jpg") || metadata.contains("image/jpeg")) {
                    contentType = "image/jpeg";
                } else if (metadata.contains("image/webp")) {
                    contentType = "image/webp";
                }
            }
            
            byte[] imageBytes = Base64.getDecoder().decode(imageData);
            
            String fileName = String.format("observations/%d/%d/%s_order%d.%s", 
                    userId, 
                    registerId != null ? registerId : 0,
                    UUID.randomUUID().toString(),
                    imageOrder,
                    getExtension(contentType));
            
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(contentType)
                    .build();
            
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(imageBytes));
            
            String imageUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", 
                    bucketName, 
                    "us-east-2",
                    fileName);
            
            log.info("Imagen subida exitosamente: {}", imageUrl);
            return imageUrl;
            
        } catch (Exception e) {
            log.error("Error subiendo imagen a S3", e);
            throw new RuntimeException("Error subiendo imagen a S3: " + e.getMessage());
        }
    }
    
    private String getExtension(String contentType) {
        return switch (contentType) {
            case "image/png" -> "png";
            case "image/webp" -> "webp";
            default -> "jpg";
        };
    }
}

