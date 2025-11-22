package com.resua.community.domain.usecase;

import com.resua.community.infrastructure.output.persistence.entity.CommentEntity;
import com.resua.community.infrastructure.output.persistence.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
public class DeleteCommentUseCase {

    private final CommentRepository commentRepository;

    public DeleteCommentUseCase(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    /**
     * Elimina un comentario si pertenece al usuario autenticado
     * 
     * @param commentId ID del comentario a eliminar
     * @param userId ID del usuario autenticado
     * @throws IllegalArgumentException si el comentario no existe o no pertenece al usuario
     */
    @Transactional
    public void execute(Long commentId, String userId) {
        log.info("Iniciando eliminación de comentario. CommentId: {}, UserId: {}", commentId, userId);
        
        Optional<CommentEntity> commentOpt = commentRepository.findById(commentId);
        
        if (commentOpt.isEmpty()) {
            log.warn("Intento de eliminar comentario inexistente. CommentId: {}", commentId);
            throw new IllegalArgumentException("El comentario con ID " + commentId + " no existe");
        }
        
        CommentEntity comment = commentOpt.get();
        log.debug("Comentario encontrado. Owner: {}, Requester: {}", comment.getUserCommentId(), userId);
        
        // Verificar que el comentario pertenece al usuario autenticado
        if (!comment.getUserCommentId().equals(userId)) {
            log.warn("Intento de eliminar comentario ajeno. CommentId: {}, Owner: {}, Requester: {}", 
                commentId, comment.getUserCommentId(), userId);
            throw new IllegalArgumentException("No tienes permiso para eliminar este comentario. Solo puedes eliminar tus propios comentarios.");
        }
        
        try {
            // Eliminar el comentario
            commentRepository.delete(comment);
            log.info("Comentario {} eliminado exitosamente por el usuario {}", commentId, userId);
        } catch (Exception e) {
            log.error("Error al eliminar comentario {} de la BD: {}", commentId, e.getMessage(), e);
            throw new RuntimeException("Error al eliminar el comentario: " + e.getMessage(), e);
        }
    }
}

