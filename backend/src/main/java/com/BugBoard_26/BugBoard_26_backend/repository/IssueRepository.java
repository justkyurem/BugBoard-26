package com.BugBoard_26.BugBoard_26_backend.repository;

import com.BugBoard_26.BugBoard_26_backend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.BugBoard_26.BugBoard_26_backend.model.Status;
import com.BugBoard_26.BugBoard_26_backend.model.Priority;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    // Metodo per trovare tutti i ticket di un utente
    List<Issue> findByAssigneeId(Long assigneeId);

    // Metodo per filtrare i ticket per stato
    List<Issue> findByStatus(Status status);

    // Metodo per filtrare i ticket per priorità
    List<Issue> findByPriority(Priority priority);

    // Metodo per filtrare i ticket per titolo o descrizione
    List<Issue> findByTitleContainingOrDescriptionContainingIgnoreCase(String text, String text2);
}
