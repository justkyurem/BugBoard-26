package com.BugBoard_26.BugBoard_26_backend.controller;

import com.BugBoard_26.BugBoard_26_backend.dto.AuthResponse;
import com.BugBoard_26.BugBoard_26_backend.dto.LoginRequest;
import com.BugBoard_26.BugBoard_26_backend.dto.RegisterRequest;
import com.BugBoard_26.BugBoard_26_backend.service.AuthService;
// import lombok.RequiredArgsConstructor; <--- RIMUOVI O COMMENTA QUESTO
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
// @RequiredArgsConstructor <--- RIMUOVI O COMMENTA QUESTO
public class AuthController {

    private final AuthService service;

    // --- AGGIUNGI QUESTO COSTRUTTORE A MANO ---
    public AuthController(AuthService service) {
        this.service = service;
    }
    // -------------------------------------------

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request));
    }
}