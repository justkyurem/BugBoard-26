package com.BugBoard_26.BugBoard_26_backend.dto;

import java.time.LocalDateTime;

import com.BugBoard_26.BugBoard_26_backend.model.IssueType;
import com.BugBoard_26.BugBoard_26_backend.model.Priority;
import com.BugBoard_26.BugBoard_26_backend.model.Status;

import lombok.Data;

@Data // Lombok genera automaticamente i metodi getter e setter
public class IssueDTO {

    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private Status status;
    private LocalDateTime deadline;
    private LocalDateTime dateAdded;
    private LocalDateTime dateResolved;
    private String imageUrl;
    private IssueType type;

    // Usiamo solo gli ID per collegare gli utenti,
    // molto più veloce e semplice che passare interi oggetti User dal frontend
    private Long assigneeId;
    private Long reporterId;

}
