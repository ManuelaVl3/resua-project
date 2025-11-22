package com.resua.community.infrastructure.output.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthValidationResponseDTO {
    
    @JsonProperty("userId")
    private Long userId;
    
    @JsonProperty("email")
    private String email;
    
    @JsonProperty("valid")
    private Boolean valid;
    
    @JsonProperty("message")
    private String message;
}

