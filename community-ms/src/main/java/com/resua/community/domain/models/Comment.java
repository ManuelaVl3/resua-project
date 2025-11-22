package com.resua.community.domain.models;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Comment {

    private Long id;
    private Long registerId;
    private String userCommentId;
    private LocalDateTime createdAt;
    private String body;
}
