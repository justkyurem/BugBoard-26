import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { UserService } from '../../services/user.service';
import { Issue } from '../../models/issue.model';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-issue-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {
    issue: Issue | null = null;
    usersList: User[] = [];
    loading: boolean = true;
    error: string | null = null;
    saveSuccess: boolean = false;
    isAdmin: boolean = localStorage.getItem('role') === 'ADMIN';
    currentUserId: number = Number(localStorage.getItem('userID'));

    constructor(
        private route: ActivatedRoute,
        private issueService: IssueService,
        private userService: UserService,
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

        // Carica lista utenti per la tendina di assegnazione (Req 4)
        this.userService.getUsers().subscribe({
            next: (data) => {
                this.usersList = data;
                this.cdRef.detectChanges();
            },
            error: (err) => console.error('Errore caricamento utenti', err)
        });
    }

    loadIssue(id: number): void {
        this.issueService.getIssueById(id).subscribe({
            next: (data) => {
                this.issue = data;
                this.loading = false;
                this.cdRef.detectChanges();
            },
            error: (err) => {
                console.error('Errore nel caricamento della issue', err);
                this.error = 'Impossibile caricare la issue. Riprova più tardi.';
                this.loading = false;
                this.cdRef.detectChanges();
            }
        });
    }

    // Salva le modifiche: stato, assegnatario, e scadenza (Req 4, 6, 18)
    saveChanges(status: string, assigneeId: string, deadline: string): void {
        if (!this.issue) return;

        const updated: any = {
            ...this.issue,
            status: status,
            // Preserva i valori esistenti se non forniti (es. quando il developer aggiorna solo lo stato)
            assigneeId: assigneeId ? Number(assigneeId) : (this.issue.assigneeId ?? null),
            deadline: deadline ? deadline : (this.issue.deadline ?? null)
        };

        this.issueService.updateIssue(this.issue.id!, updated).subscribe({
            next: (data) => {
                this.issue = data;
                this.saveSuccess = true;
                this.cdRef.detectChanges();
                // Nascondi il messaggio di successo dopo 3 secondi
                setTimeout(() => { this.saveSuccess = false; this.cdRef.detectChanges(); }, 3000);
            },
            error: (err) => {
                console.error('Errore nel salvataggio', err);
                alert('Errore nel salvataggio. Riprova.');
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
