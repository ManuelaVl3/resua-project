package com.resua.observations.infrastructure.ports.out.database;

import com.resua.observations.infrastructure.adapters.out.database.entities.RegisterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegisterRepository extends JpaRepository<RegisterEntity, Long> {
    
    @Query("SELECT DISTINCT r FROM RegisterEntity r " +
           "LEFT JOIN FETCH r.images " +
           "LEFT JOIN FETCH r.species " +
           "LEFT JOIN FETCH r.location " +
           "WHERE r.userId = :userId")
    List<RegisterEntity> findAllByUserId(@Param("userId") Long userId);
    
    @Query("SELECT r FROM RegisterEntity r " +
           "LEFT JOIN FETCH r.images " +
           "LEFT JOIN FETCH r.species " +
           "LEFT JOIN FETCH r.location " +
           "WHERE r.id = :id")
    Optional<RegisterEntity> findByIdWithRelations(@Param("id") Long id);
}
