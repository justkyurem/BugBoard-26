package com.BugBoard_26.BugBoard_26_backend.controller;

import com.BugBoard_26.BugBoard_26_backend.dto.IssueDTO;
import com.BugBoard_26.BugBoard_26_backend.service.IssueService;
import com.BugBoard_26.BugBoard_26_backend.model.Issue;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

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

    // RF - 6: Cambio stato issue
    // PUT /api/issues/{id}/status?newStatus={newStatus}
    @PutMapping("/{id}/status")
    public ResponseEntity<Issue> updateStatus(@PathVariable Long id, @RequestParam String newStatus) {
        return ResponseEntity.ok(issueService.updateStatus(id, newStatus));
    }

}
