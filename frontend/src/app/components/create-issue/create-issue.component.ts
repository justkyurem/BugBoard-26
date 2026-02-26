import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue, Priority, Status, IssueType } from '../../models/issue.model';

@Component({
  selector: 'app-create-issue',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})

export class CreateIssueComponent {

  issue: Issue = {
    title: '',
    description: '',
    priority: Priority.MEDIUM,
    status: Status.TODO,
    type: IssueType.BUG
  };

  priorities = Object.values(Priority);
  types = Object.values(IssueType);
  selectedFile: File | null = null;


  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    // Imposta il reporter come l'utente loggato
    const userId = localStorage.getItem('userID');
    if (userId) {
      this.issue.reporterId = Number(userId);
    }

    if (this.selectedFile) {
      this.issueService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          this.issue.imageUrl = response.imageUrl;
          this.saveIssue();
        },
        error: (err) => {
          console.error('Errore caricamento file', err);
          alert('Errore caricamento file');
        }
      });
    } else {
      this.saveIssue();
    }
  }

  private saveIssue(): void {
    this.issueService.createIssue(this.issue).subscribe({
      next: () => {
        alert('Ticket creato con successo!');
        this.router.navigate(['/issue-board']);
      },
      error: (err) => {
        console.error('Errore creazione ticket', err);
        alert('Errore creazione ticket');
      }
    });
  }
}
