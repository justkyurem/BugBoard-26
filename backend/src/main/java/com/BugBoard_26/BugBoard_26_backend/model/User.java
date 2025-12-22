package com.BugBoard_26.BugBoard_26_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users") // ATTENZIONE: "users" a volte è parola riservata in SQL. Se hai errori, usa "app_users".
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails { // <--- Implementa UserDetails

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    @Column(unique = true, nullable = false)
    private String email; // Useremo l'email come username per il login?

    @NotBlank
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // --- METODI DI SPRING SECURITY (UserDetails) ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring Security vuole i ruoli nel formato "ROLE_ADMIN" o "ROLE_USER"
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email; // Qui decidiamo che ci si logga con la EMAIL
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Account sempre valido
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Account mai bloccato
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Credenziali mai scadute
    }

    @Override
    public boolean isEnabled() {
        return true; // Utente abilitato
    }
}