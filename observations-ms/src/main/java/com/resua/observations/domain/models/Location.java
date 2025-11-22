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
public class Location{

    private Long id;
    private Double longitude;
    private Double latitude;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

