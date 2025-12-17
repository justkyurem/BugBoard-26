package com.BugBoard_26.BugBoard_26_backend.repository;

import com.BugBoard_26.BugBoard_26_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Metodo per trovare un utente per email
    Optional<User> findByEmail(String email);

    // Metodo per evitare utenti duplicati
    boolean existsByEmail(String email);
}
