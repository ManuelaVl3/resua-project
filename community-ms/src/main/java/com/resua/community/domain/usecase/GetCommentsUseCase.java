package com.resua.community.domain.usecase;

import com.resua.community.infrastructure.input.response.CommentResponseDTO;
import com.resua.community.infrastructure.output.client.AuthClient;
import com.resua.community.infrastructure.output.client.dto.UserResponseDTO;
import com.resua.community.infrastructure.output.persistence.entity.CommentEntity;
import com.resua.community.infrastructure.output.persistence.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class GetCommentsUseCase {

    private final CommentRepository commentRepository;
    private final AuthClient authClient;

    public GetCommentsUseCase(CommentRepository commentRepository, @Lazy AuthClient authClient) {
        this.commentRepository = commentRepository;
        this.authClient = authClient;
    }

    /**
     * Obtiene todos los comentarios de una observación
     * 
     * @param observationId ID de la observación
     * @return Lista de comentarios con información del usuario
     */
    public List<CommentResponseDTO> execute(Long observationId) {
        // Obtener comentarios de la base de datos
        List<CommentEntity> comments = commentRepository.findByRegisterIdOrderByCreatedAtAsc(observationId);
        log.info("Comentarios encontrados para observationId {}: {}", observationId, comments.size());
        
        // Convertir a DTOs con información del usuario
        return comments.stream()
                .map(comment -> {
                    try {
                        ResponseEntity<UserResponseDTO> userResponse = authClient.getUserById(Long.parseLong(comment.getUserCommentId()));
                        
                        String userName = "Usuario desconocido";
                        if (userResponse.getStatusCode() == HttpStatus.OK && userResponse.getBody() != null) {
                            UserResponseDTO user = userResponse.getBody();
                            userName = user.getName() != null ? user.getName() : user.getEmail();
                        }
                        
                        Long userId = Long.parseLong(comment.getUserCommentId());
                        return new CommentResponseDTO(comment.getId(), userId, userName, comment.getBody());
                    } catch (Exception e) {
                        log.warn("Error al obtener información del usuario {}: {}", comment.getUserCommentId(), e.getMessage());
                        Long userId = Long.parseLong(comment.getUserCommentId());
                        return new CommentResponseDTO(comment.getId(), userId, "Usuario " + comment.getUserCommentId(), comment.getBody());
                    }
                })
                .collect(Collectors.toList());
    }
}

