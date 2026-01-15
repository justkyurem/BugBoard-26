package com.BugBoard_26.BugBoard_26_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "L'email è obbligatoria")
    @Email(message = "Inserire un'email valida")
    private String email;

    @NotBlank(message = "La password è obbligatoria")
    private String password;

    // --- 1. COSTRUTTORI ---
    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // --- 2. GETTERS  ---
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    // --- 3. SETTERS ---
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}