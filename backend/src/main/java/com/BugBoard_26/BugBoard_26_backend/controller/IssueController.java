package com.BugBoard_26.BugBoard_26_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BugBoard_26.BugBoard_26_backend.dto.IssueDTO;
import com.BugBoard_26.BugBoard_26_backend.model.IssueType;
import com.BugBoard_26.BugBoard_26_backend.model.Priority;
import com.BugBoard_26.BugBoard_26_backend.model.Status;
import com.BugBoard_26.BugBoard_26_backend.service.IssueService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin("*")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    // RF - 3: Ottenimento issue per ID
    // GET /api/issues/{id}
    @GetMapping("/{id}")
    public ResponseEntity<IssueDTO> getIssueById(@PathVariable Long id) {
        return ResponseEntity.ok(issueService.getIssueById(id));
    }

    // RF - 3: Ottenimento lista issue con filtri opzionali
    // GET /api/issues?status=TODO&priority=HIGH&type=BUG
    @GetMapping
    public ResponseEntity<List<IssueDTO>> getAllIssues(
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) IssueType type) {
        List<IssueDTO> issues = issueService.getIssuesFiltered(status, priority, type);
        return ResponseEntity.ok(issues);
    }

    // RF - 2: Creazione issue
    // POST /api/issues
    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueDTO issueDTO) {
        return ResponseEntity.ok(issueService.createIssue(issueDTO));
    }

    // RF - 6: Aggiorna issue
    // PUT /api/issues/{id}
    @PutMapping("/{id}")
    public ResponseEntity<IssueDTO> updateIssue(@PathVariable Long id, @RequestBody IssueDTO issueDTO) {
        return ResponseEntity.ok(issueService.updateIssue(id, issueDTO));
    }

    // Cancellazione
    // DELETE /api/issues/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        issueService.deleteIssue(id);
        return ResponseEntity.noContent().build();
    }

    // RF - 11: Ricerca issue
    // GET /api/issues/search?keyword=...
    @GetMapping("/search")
    public ResponseEntity<List<IssueDTO>> searchIssues(@RequestParam String keyword) {
        return ResponseEntity.ok(issueService.searchIssues(keyword));
    }

}
