package com.resua.community.infrastructure.input.config;

import com.resua.community.infrastructure.output.client.AuthClient;
import com.resua.community.infrastructure.output.client.dto.AuthValidationResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {

    private final AuthClient authClient;

    public AuthInterceptor(@Lazy AuthClient authClient) {
        this.authClient = authClient;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Manejar preflight requests de CORS
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            String origin = request.getHeader("Origin");
            if (origin != null) {
                response.setHeader("Access-Control-Allow-Origin", origin);
            }
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
            response.setHeader("Access-Control-Allow-Headers", "*");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setStatus(HttpServletResponse.SC_OK);
            return false; // No continuar con el procesamiento
        }
        
        // Permitir GET sin autenticación (los comentarios son públicos)
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        
        String authHeader = request.getHeader("Authorization");
        log.info("Request recibido. Method: {}, Path: {}, Authorization header presente: {}", 
            request.getMethod(), request.getRequestURI(), authHeader != null);
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Token de autorización no encontrado o formato incorrecto. Header: {}", authHeader);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Token de autorización requerido\"}");
            return false;
        }

        try {
            log.debug("Validando token con auth-ms. Header: {}", authHeader.substring(0, Math.min(20, authHeader.length())) + "...");
            AuthValidationResponseDTO authResponse = authClient.validateToken(authHeader);
            
            log.debug("Respuesta de auth-ms: valid={}, userId={}", 
                authResponse != null ? authResponse.getValid() : null,
                authResponse != null ? authResponse.getUserId() : null);
            
            if (authResponse == null || !Boolean.TRUE.equals(authResponse.getValid()) || authResponse.getUserId() == null) {
                log.warn("Token inválido o respuesta inválida. Response: {}", authResponse);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"error\": \"Token inválido\"}");
                return false;
            }

            // Convertir userId (Long) a String para guardarlo en el request
            String userId = String.valueOf(authResponse.getUserId());
            request.setAttribute("userId", userId);
            log.debug("Token válido. userId: {}", userId);
            
            return true;
        } catch (Exception e) {
            log.error("Error al validar el token: {}", e.getMessage(), e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Error al validar el token: " + e.getMessage() + "\"}");
            return false;
        }
    }
}

