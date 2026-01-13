package com.BugBoard_26.BugBoard_26_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BugBoard_26.BugBoard_26_backend.dto.IssueDTO;
import com.BugBoard_26.BugBoard_26_backend.model.Issue;
import com.BugBoard_26.BugBoard_26_backend.service.IssueService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/issues") // Mappa tutte le richieste sull'url /api/issues
@CrossOrigin("*") // Permette ad angular di accedere al backend
@RequiredArgsConstructor // Inietta il Service automaticamente
public class IssueController {

    private final IssueService issueService;

    // RF - 3: Ottenimento lista issue
    // GET /api/issues
    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    // RF - 2: Creazione issue
    // POST /api/issues
    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody IssueDTO issueDTO) {
        // @RequestBody prende il JSON inviato dal client e lo converte in un oggetto
        // IssueDTO
        return ResponseEntity.ok(issueService.createIssue(issueDTO));
    }

    // RF - 6: Aggiorna issue
    // PUT /api/issues/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Issue> updateIssue(@PathVariable Long issueId, @RequestBody IssueDTO issueDTO) {
        return ResponseEntity.ok(issueService.updateIssue(issueId, issueDTO));
    }

}
