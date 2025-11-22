package com.resua.auth.infrastructure.adapters.in.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateTokenResponseDTO {
    private Long userId;
    private String email;
    private boolean valid;
    private String message;
}

