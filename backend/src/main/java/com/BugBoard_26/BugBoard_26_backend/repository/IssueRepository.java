package com.BugBoard_26.BugBoard_26_backend.repository;

import com.BugBoard_26.BugBoard_26_backend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    // Metodo per trovare tutti i ticket di un utente
    List<Issue> findByAssigneeId(Long assigneeId);
}
