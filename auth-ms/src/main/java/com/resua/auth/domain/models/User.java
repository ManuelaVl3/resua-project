package com.resua.auth.domain.models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class User {

    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    private String securityQuestion;
    private String secretAnswer;
}
