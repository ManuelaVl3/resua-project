package com.resua.community.domain.models;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Report {

    private Long id;
    private Long commentId;
    private String reason;
    private int state;
    private LocalDateTime createdAt;

}
