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
    if (this.selectedFile) {
      // Se c'è un file, lo carico prima
      this.issueService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          this.issue.imageUrl = response.imageUrl; // Assegna l'url ricevuto
          this.saveIssue();
        },
        error: (err) => {
          console.error('Errore caricamento file', err);
          alert('Errore caricamento file');
        }
      });
    } else {
      // Nessun file, creo il ticket
      this.saveIssue();
    }
  }

  // Metodo per non ripetere il codice
  private saveIssue(): void {
    this.issueService.createIssue(this.issue).subscribe({
      next: () => {
        alert('Ticket creato con successo!');
        this.router.navigate(['/issues']);
      },
      error: (err) => {
        console.error('Errore creazione ticket', err);
        alert('Errore creazione ticket');
      }
    });
  }
}
