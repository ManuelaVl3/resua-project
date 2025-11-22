package com.resua.community.infrastructure.output.persistence.repository;

import com.resua.community.infrastructure.output.persistence.entity.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    
    /**
     * Busca todos los reportes de un comentario específico
     * @param commentId ID del comentario
     * @return Lista de reportes
     */
    List<ReportEntity> findByComment_Id(Long commentId);
    
    /**
     * Busca todos los reportes por estado
     * @param state Estado del reporte
     * @return Lista de reportes
     */
    List<ReportEntity> findByState(Integer state);
}

