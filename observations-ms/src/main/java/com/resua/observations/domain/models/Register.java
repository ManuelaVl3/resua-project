package com.resua.observations.domain.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Register{
    private Long id;
    private Long userId;
    private Species species;
    private Location location;
    private String description;
    private List<RegisterImage> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

