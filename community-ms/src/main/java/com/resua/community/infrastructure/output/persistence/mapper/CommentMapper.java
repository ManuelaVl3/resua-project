package com.resua.community.infrastructure.output.persistence.mapper;

import com.resua.community.domain.models.Comment;
import com.resua.community.infrastructure.input.request.CommunityRequestDTO;
import com.resua.community.infrastructure.output.persistence.entity.CommentEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class CommentMapper {

    public Comment toDomainModel(CommentEntity entity) {
        if (entity == null) {
            return null;
        }
        return Comment.builder()
                .id(entity.getId())
                .registerId(entity.getRegisterId())
                .userCommentId(entity.getUserCommentId())
                .createdAt(entity.getCreatedAt())
                .body(entity.getBody())
                .build();
    }

    public CommentEntity toEntity(Comment domainModel) {
        if (domainModel == null) {
            return null;
        }
        CommentEntity entity = new CommentEntity();
        entity.setId(domainModel.getId());
        entity.setRegisterId(domainModel.getRegisterId());
        entity.setUserCommentId(domainModel.getUserCommentId());
        entity.setCreatedAt(domainModel.getCreatedAt());
        entity.setBody(domainModel.getBody());
        return entity;
    }

    public Comment toDomainModel(CommunityRequestDTO dto, String userId) {
        if (dto == null) {
            return null;
        }
        return Comment.builder()
                .registerId(dto.getObservationId())
                .userCommentId(userId)
                .body(dto.getDescription())
                .createdAt(LocalDateTime.now())
                .build();
    }
}

