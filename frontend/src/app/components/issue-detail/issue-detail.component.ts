import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';

@Component({
    selector: 'app-issue-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {
    issue: Issue | null = null;
    loading: boolean = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private issueService: IssueService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadIssue(Number(id));
        } else {
            this.error = 'ID Issue non valido';
            this.loading = false;
        }
    }

    loadIssue(id: number): void {
        this.issueService.getIssueById(id).subscribe({
            next: (data) => {
                this.issue = data;
                this.loading = false;
                this.cdRef.detectChanges(); // Forza il refresh della UI
            },
            error: (err) => {
                console.error('Errore nel caricamento della issue', err);
                this.error = 'Impossibile caricare la issue. Riprova più tardi.';
                this.loading = false;
                this.cdRef.detectChanges(); // Forza il refresh della UI
            }
        });
    }

    getPriorityClass(priority: string): string {
        switch (priority) {
            case 'CRITICAL': return 'badge-critical';
            case 'HIGH': return 'badge-high';
            case 'MEDIUM': return 'badge-medium';
            case 'LOW': return 'badge-low';
            default: return 'badge-default';
        }
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'TODO': return 'badge-todo';
            case 'IN_PROGRESS': return 'badge-progress';
            case 'DONE': return 'badge-done';
            case 'DUPLICATE': return 'badge-duplicate';
            default: return 'badge-default';
        }
    }
}
