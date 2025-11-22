package com.resua.observations.infrastructure.adapters.out.database;

import com.resua.observations.domain.models.Register;
import com.resua.observations.infrastructure.adapters.out.database.entities.RegisterEntity;
import com.resua.observations.infrastructure.adapters.out.database.mappers.RegisterMapper;
import com.resua.observations.infrastructure.ports.out.database.RegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class RegisterAdapter {
    private final RegisterRepository registerRepository;

    private final RegisterMapper registerMapper;

    public List<Register> getObservationsByUser(Long userId) {
        List<RegisterEntity> registerEntities = registerRepository.findAllByUserId(userId);
        return registerMapper.toModel(registerEntities);
    }

    public Optional<Register> getObservationById(Long id) {
        return registerRepository.findByIdWithRelations(id).map(registerMapper::toModel);
    }

    public boolean deleteObservationById(Long id) {
        if (registerRepository.existsById(id)) {
            registerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Register createObservation(Register register) {
        LocalDateTime now = LocalDateTime.now();
        register.setCreatedAt(now);
        register.setUpdatedAt(now);
        
        if (register.getSpecies() != null) {
            register.getSpecies().setCreatedAt(now);
            register.getSpecies().setUpdatedAt(now);
        }
        
        if (register.getLocation() != null) {
            register.getLocation().setCreatedAt(now);
            register.getLocation().setUpdatedAt(now);
        }
        
        RegisterEntity entity = registerMapper.toEntity(register);
        
        if (entity.getImages() != null) {
            entity.getImages().forEach(image -> image.setRegister(entity));
        }
        
        RegisterEntity savedEntity = registerRepository.save(entity);
        return registerMapper.toModel(savedEntity);
    }

    public Register updateObservation(Register register) {
        LocalDateTime now = LocalDateTime.now();
        register.setUpdatedAt(now);
        
        if (register.getSpecies() != null) {
            register.getSpecies().setUpdatedAt(now);
        }
        
        if (register.getLocation() != null) {
            register.getLocation().setUpdatedAt(now);
        }
        
        RegisterEntity entity = registerMapper.toEntity(register);
        
        if (entity.getImages() != null) {
            entity.getImages().forEach(image -> image.setRegister(entity));
        }
        
        RegisterEntity savedEntity = registerRepository.save(entity);
        return registerMapper.toModel(savedEntity);
    }
}
