package com.resua.community.domain.usecase;

import com.resua.community.domain.models.Comment;
import com.resua.community.infrastructure.input.request.CommunityRequestDTO;
import com.resua.community.infrastructure.output.client.ObservationsClient;
import com.resua.community.infrastructure.output.persistence.entity.CommentEntity;
import com.resua.community.infrastructure.output.persistence.mapper.CommentMapper;
import com.resua.community.infrastructure.output.persistence.repository.CommentRepository;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class CreateCommentUseCase {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final ObservationsClient observationsClient;

    public CreateCommentUseCase(CommentRepository commentRepository, 
                                CommentMapper commentMapper,
                                @Lazy ObservationsClient observationsClient) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.observationsClient = observationsClient;
    }

    /**
     * Crea un nuevo comentario para un registro/observación
     * 
     * @param requestDTO DTO con los datos del comentario
     * @param userId ID del usuario autenticado que crea el comentario
     * @throws IllegalArgumentException si el registro no existe o los datos son inválidos
     */
    @Transactional
    public void execute(CommunityRequestDTO requestDTO, String userId) {
        log.info("Iniciando creación de comentario. ObservationId: {}, UserId: {}", requestDTO.getObservationId(), userId);
        
        // Verificar que la observación existe ANTES de guardar
        try {
            ResponseEntity<Object> observationResponse = observationsClient.getObservationById(requestDTO.getObservationId());
            if (observationResponse == null || observationResponse.getStatusCode() != HttpStatus.OK || observationResponse.getBody() == null) {
                log.warn("Observación con ID {} no encontrada", requestDTO.getObservationId());
                throw new IllegalArgumentException("El registro con ID " + requestDTO.getObservationId() + " no existe");
            }
            log.debug("Observación {} validada correctamente", requestDTO.getObservationId());
        } catch (FeignException.NotFound e) {
            log.warn("Observación con ID {} no encontrada (404): {}", requestDTO.getObservationId(), e.getMessage());
            throw new IllegalArgumentException("El registro con ID " + requestDTO.getObservationId() + " no existe");
        } catch (FeignException e) {
            log.error("Error de Feign al validar observación {}: {}", requestDTO.getObservationId(), e.getMessage(), e);
            throw new IllegalArgumentException("Error al validar el registro. El servicio de observaciones no está disponible.");
        } catch (IllegalArgumentException e) {
            // Re-lanzar IllegalArgumentException sin modificar
            throw e;
        } catch (Exception e) {
            log.error("Error inesperado al validar observación {}: {}", requestDTO.getObservationId(), e.getMessage(), e);
            throw new IllegalArgumentException("Error al validar el registro: " + e.getMessage());
        }

        if (requestDTO.getDescription() == null || requestDTO.getDescription().trim().isEmpty()) {
            log.warn("Intento de crear comentario vacío para observationId: {}", requestDTO.getObservationId());
            throw new IllegalArgumentException("El comentario no puede estar vacío");
        }

        Comment comment = commentMapper.toDomainModel(requestDTO, userId);
        CommentEntity entity = commentMapper.toEntity(comment);

        try {
            CommentEntity savedEntity = commentRepository.save(entity);
            
            log.info("Comentario guardado exitosamente. ID: {}, RegisterId: {}, UserId: {}", 
                savedEntity.getId(), savedEntity.getRegisterId(), savedEntity.getUserCommentId());
        } catch (Exception e) {
            log.error("Error al guardar comentario en BD: {}", e.getMessage(), e);
            throw new RuntimeException("Error al guardar el comentario: " + e.getMessage(), e);
        }
    }
}

