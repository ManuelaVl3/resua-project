package com.resua.community.infrastructure.output.persistence.repository;

import com.resua.community.infrastructure.output.persistence.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    
    /**
     * Busca todos los comentarios de un registro específico
     * @param registerId ID del registro/observación
     * @return Lista de comentarios ordenados por fecha de creación
     */
    @Query("SELECT c FROM CommentEntity c WHERE c.registerId = :registerId ORDER BY c.createdAt ASC")
    List<CommentEntity> findByRegisterIdOrderByCreatedAtAsc(@Param("registerId") Long registerId);
    
    /**
     * Verifica si existe al menos un comentario para un registro
     * @param registerId ID del registro/observación
     * @return true si existe al menos un comentario
     */
    boolean existsByRegisterId(Long registerId);
}

