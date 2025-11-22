package com.resua.observations.domain.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Species{

    private Long id;
    private String commonName;
    private String scientificName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
