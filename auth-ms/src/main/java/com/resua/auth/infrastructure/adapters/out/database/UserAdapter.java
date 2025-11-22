package com.resua.auth.infrastructure.adapters.out.database;

import com.resua.auth.domain.models.User;
import com.resua.auth.infrastructure.adapters.out.database.entities.UserEntity;
import com.resua.auth.infrastructure.adapters.out.database.mappers.UserMapper;
import com.resua.auth.infrastructure.ports.out.database.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserAdapter {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId).map(userMapper::toModel);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email).map(userMapper::toModel);
    }

    public User createUser(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        UserEntity userEntity = userMapper.toEntity(user);
        UserEntity savedUserEntity = userRepository.save(userEntity);
        return userMapper.toModel(savedUserEntity);
    }

    public User updateUser(User user) {
        // SIEMPRE hashear la contraseña si no está hasheada (no empieza con $2)
        if (user.getPassword() != null && !user.getPassword().startsWith("$2")) {
            // La contraseña está en texto plano, hay que hashearla
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
        } else if (user.getId() != null && user.getPassword() == null) {
            // Si no se proporciona contraseña, mantener la existente
            Optional<UserEntity> existingUser = userRepository.findById(user.getId());
            if (existingUser.isPresent()) {
                user.setPassword(existingUser.get().getPassword());
            }
        }
        
        UserEntity userEntity = userMapper.toEntity(user);
        UserEntity updatedUserEntity = userRepository.save(userEntity);
        return userMapper.toModel(updatedUserEntity);
    }
}
