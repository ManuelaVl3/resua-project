package com.resua.auth.infrastructure.ports.out.database;

import com.resua.auth.infrastructure.adapters.out.database.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findUserByEmail(String email);
}
