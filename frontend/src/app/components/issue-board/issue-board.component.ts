import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue, Status, Priority } from '../../models/issue.model';
@Component({
  selector: 'app-issue-board',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './issue-board.component.html',
  styleUrls: ['./issue-board.component.css']
})
export class IssueBoardComponent implements OnInit {
  issues: Issue[] = [];
  status = Status;
  constructor(
    private issueService: IssueService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.loadIssues();
  }
  loadIssues(): void {
    this.issueService.getAllIssues().subscribe({
      next: (data) => {
        this.issues = data;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => console.error('Error:', err)
    });
  }
  deleteIssue(id: number | undefined): void {
    if (!id) return;
    if (confirm('Eliminare questo ticket?')) {
      this.issueService.deleteIssue(id).subscribe(() => this.loadIssues());
    }
  }
  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.HIGH: return 'badge-high';
      case Priority.MEDIUM: return 'badge-medium';
      case Priority.LOW: return 'badge-low';
      default: return 'badge-default';
    }
  }
  getStatusClass(status: Status): string {
    switch (status) {
      case Status.TODO: return 'status-todo';
      case Status.IN_PROGRESS: return 'status-progress';
      case Status.RESOLVED: return 'status-resolved';
      default: return 'status-default';
    }
  }
}