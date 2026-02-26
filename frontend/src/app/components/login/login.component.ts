import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    // Nota: L'URL dovrebbe essere in un environment file, ma per ora va bene così
    this.http.post<any>('http://localhost:8080/api/auth/login', this.loginData)
      .subscribe({
        next: (response) => {
          // Salviamo il token (lo useremo dopo per le chiamate autenticate)
          localStorage.setItem('token', response.token);
          localStorage.setItem('userID', response.userId);
          localStorage.setItem('role', response.role);
          this.loading = false;
          this.router.navigate(['/issue-board']);
        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = 'Email o password non validi';
          this.loading = false;
        }
      });
  }
}