package com.BugBoard_26.BugBoard_26_backend.dto;

public class AuthResponse {

    private String token;

    // 1. Costruttore
    public AuthResponse() {
    }

    // 2. Costruttore PIENO
    // Senza questo, "new AuthResponse(jwtToken)" dà errore.
    public AuthResponse(String token) {
        this.token = token;
    }

    // 3. Getter e Setter (Serve per trasformare l'oggetto in JSON)
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}