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

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.issueService.createIssue(this.issue).subscribe({
      next: () => {
        alert('Ticket creato con successo!');
        this.router.navigate(['/']); // Torna alla dashboard
      },
      error: (err) => {
        console.error(err);
        alert('Errore durante la creazione.');
      }
    });
  }
}