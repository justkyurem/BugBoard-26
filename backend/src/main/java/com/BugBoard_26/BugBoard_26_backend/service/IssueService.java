package com.BugBoard_26.BugBoard_26_backend.service;

import com.BugBoard_26.BugBoard_26_backend.dto.IssueDTO;
import com.BugBoard_26.BugBoard_26_backend.model.Issue;
import com.BugBoard_26.BugBoard_26_backend.model.Status;
import com.BugBoard_26.BugBoard_26_backend.model.User;
import com.BugBoard_26.BugBoard_26_backend.model.Priority;
import com.BugBoard_26.BugBoard_26_backend.model.IssueType;
import com.BugBoard_26.BugBoard_26_backend.repository.IssueRepository;
import com.BugBoard_26.BugBoard_26_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor // Crea il costruttore automatico per i repository 'final'
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;

    // RF - 2: Creazione Issue

    public Issue createIssue(IssueDTO issueDTO) {

        // Copiamo i dati dal DTO all'entità

        Issue issue = new Issue();
        issue.setTitle(issueDTO.getTitle());
        issue.setDescription(issueDTO.getDescription());
        issue.setPriority(issueDTO.getPriority());
        issue.setStatus(issueDTO.getStatus());
        issue.setDeadline(issueDTO.getDeadline());
        issue.setDateResolved(issueDTO.getDateResolved());
        issue.setImageUrl(issueDTO.getImageUrl());
        issue.setType(issueDTO.getType());

        // Se non c'è stato, lo mettiamo in "TODO"
        if (issueDTO.getStatus() != null) {
            issue.setStatus(issueDTO.getStatus());
        }

        // Gestiamo le relazioni con gli utenti
        // Cerchiamo il reporter (chi ha aperto il ticket)
        if (issueDTO.getReporterId() != null) {
            User reporter = userRepository.findById(issueDTO.getReporterId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Reporter non trovato con ID: " + issueDTO.getReporterId()));
            issue.setReporter(reporter);
        }

        // Cerchiamo il assignee (chi deve risolvere il ticket)
        if (issueDTO.getAssigneeId() != null) {
            User assignee = userRepository.findById(issueDTO.getAssigneeId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Assignee non trovato con ID: " + issueDTO.getAssigneeId()));
            issue.setAssignee(assignee);
        }

        // Salviamo l'issue
        return issueRepository.save(issue);
    }

    // RF - 3: Visualizzazione Issue
    @Transactional(readOnly = true) // Ottimizza le prestazioni in lettura
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Issue getIssueById(Long issueId) {
        return issueRepository.findById(issueId)
                .orElseThrow(() -> new EntityNotFoundException("Issue non trovata con ID: " + issueId));
    }

    @Transactional(readOnly = true)
    public List<Issue> getIssuesFiltered(Status status, Priority priority, IssueType type) {
        return issueRepository.findByFilters(status, priority, type);
    }

    // RF - 11: Ricerca Issue
    public List<Issue> searchIssues(String keyword) {
        return issueRepository.findByTitleContainingOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    // RF - 6: Modifica Issue
    @Transactional
    public Issue updateIssue(Long issueId, IssueDTO issueDTO) {
        // Cerchiamo l'issue
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new EntityNotFoundException("Issue non trovata con ID: " + issueId));

        issue.setTitle(issueDTO.getTitle());
        issue.setDescription(issueDTO.getDescription());
        issue.setPriority(issueDTO.getPriority());
        issue.setStatus(issueDTO.getStatus());
        issue.setDeadline(issueDTO.getDeadline());
        issue.setDateResolved(issueDTO.getDateResolved());
        issue.setImageUrl(issueDTO.getImageUrl());
        issue.setType(issueDTO.getType());

        // Salviamo l'issue
        return issueRepository.save(issue);
    }

    // Cancellazione
    public void deleteIssue(Long issueId) {
        if (!issueRepository.existsById(issueId)) {
            throw new EntityNotFoundException("Issue non trovata con ID: " + issueId);
        }
        issueRepository.deleteById(issueId);
    }

}
