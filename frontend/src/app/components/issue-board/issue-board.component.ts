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
  isAdmin: boolean = localStorage.getItem('role') === 'ADMIN';

  constructor(
    private issueService: IssueService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  // Filtri
  filterStatus: string = '';
  filterPriority: string = '';
  filterType: string = '';
  filterMine: boolean = false;
  sortBy: string = 'dateAdded';
  sortDir: string = 'desc';


  ngOnInit(): void {
    this.loadIssues();
  }
  loadIssues(): void {
    this.issueService.getAllIssues().subscribe({
      next: (data) => {
        this.issues = data;
        this.cdr.detectChanges();
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
  applyFilters(): void {
    const params: any = {};
    if (this.filterStatus) params['status'] = this.filterStatus;
    if (this.filterPriority) params['priority'] = this.filterPriority;
    if (this.filterType) params['type'] = this.filterType;
    params['sortBy'] = this.sortBy;
    params['sortDir'] = this.sortDir;
    this.issueService.getIssuesFiltered(params).subscribe({
      next: (data) => {
        this.issues = this.filterMine
          ? data.filter(i => i.assigneeId === Number(localStorage.getItem('userID')))
          : data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Filter Error:', err)
    });
  }
  resetFilters(statusEl: HTMLSelectElement, priorityEl: HTMLSelectElement, typeEl: HTMLSelectElement,
    sortByEl: HTMLSelectElement, sortDirEl: HTMLSelectElement): void {
    this.filterStatus = '';
    this.filterPriority = '';
    this.filterType = '';
    this.sortBy = 'dateAdded';
    this.sortDir = 'desc';
    statusEl.value = '';
    priorityEl.value = '';
    typeEl.value = '';
    sortByEl.value = 'dateAdded';
    sortDirEl.value = 'desc';
    this.loadIssues();
  }
  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.CRITICAL: return 'badge-critical';
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
      case Status.DONE: return 'status-done';
      case Status.DUPLICATE: return 'status-duplicate';
      default: return 'status-default';
    }
  }
  onSearch(keyword: string): void {
    if (!keyword.trim()) {
      this.loadIssues();
      return;
    }
    this.issueService.searchIssues(keyword).subscribe({
      next: (data) => {
        this.issues = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    })
  }
}