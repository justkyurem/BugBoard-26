package com.BugBoard_26.BugBoard_26_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "issues")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000) // descrizioni lunghe 1000 caratteri
    private String description;

    // Gestione enum
    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private IssueType type;

    // Gestione Relazioni
    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter; // Chi ha aperto il ticket

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee; // Chi deve risolverlo

    // DATE
    private LocalDateTime dateAdded;

    // Metodo chiamato automaticamente PRIMA di salvare nel database
    @PrePersist
    protected void onCreate() {
        this.dateAdded = LocalDateTime.now(); // Data di creazione
        if (this.status == null) {
            this.status = Status.TODO; // Default
        }
    }
}
