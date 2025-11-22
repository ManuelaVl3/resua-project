package com.resua.auth.infrastructure.ports.in;

import com.resua.auth.infrastructure.adapters.in.request.LoginRequestDTO;
import com.resua.auth.infrastructure.adapters.in.response.LoginResponseDTO;


public interface LoginUser {

    LoginResponseDTO login(LoginRequestDTO loginRequest);
}

