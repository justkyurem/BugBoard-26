package com.BugBoard_26.BugBoard_26_backend.service;

import com.BugBoard_26.BugBoard_26_backend.dto.AuthResponse;
import com.BugBoard_26.BugBoard_26_backend.dto.LoginRequest;
import com.BugBoard_26.BugBoard_26_backend.dto.RegisterRequest;
import com.BugBoard_26.BugBoard_26_backend.model.Role;
import com.BugBoard_26.BugBoard_26_backend.model.User;
import com.BugBoard_26.BugBoard_26_backend.repository.UserRepository;
import com.BugBoard_26.BugBoard_26_backend.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    // --- 1. COSTRUTTORE MANUALE (Per evitare errori di Lombok) ---
    public AuthService(UserRepository repository,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils,
            AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        var user = new User();
        // Usiamo i setter manuali che hai creato
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Se il ruolo è null, usa USER
        user.setRole(request.getRole() != null ? request.getRole() : Role.STANDARD);

        repository.save(user);

        // Aggiungi il ruolo al JWT
        var extraClaims = new java.util.HashMap<String, Object>();
        extraClaims.put("role", user.getRole().name());
        var jwtToken = jwtUtils.generateToken(extraClaims, user);

        // --- 2. CORREZIONE QUI: Usa "new", non ".builder()" ---
        return new AuthResponse(jwtToken, user.getId(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        // Aggiungi il ruolo al JWT
        var extraClaims = new java.util.HashMap<String, Object>();
        extraClaims.put("role", user.getRole().name());
        var jwtToken = jwtUtils.generateToken(extraClaims, user);

        // --- 3. CORREZIONE QUI: Usa "new", non ".builder()" ---
        return new AuthResponse(jwtToken, user.getId(), user.getRole().name());
    }
}