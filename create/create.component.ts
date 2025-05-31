import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
})
export class CreateComponent {
  username: string = '';
  password: string = '';
  passwordError: boolean = false;
  apiUrl = 'http://localhost:3001/users';
  showPopup: boolean = false;
  createdUsername: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  validatePassword() {
    const regex = /^(?=.*[A-Za-z]{4,})(?=.*\d{3,})(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    this.passwordError = !regex.test(this.password);
  }

  createAccount() {
    if (this.passwordError || this.username.trim() === '') {
      alert('❌ Please fix password errors before proceeding.');
      return;
    }

    // Check if user already exists
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      const existingUser = users.find(u => u.username === this.username);
      if (existingUser) {
        alert('❌ Username already exists. Please choose a different one.');
        return;
      }

      // If not, create new user
      const newUser = { username: this.username, password: this.password };
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.post(this.apiUrl, newUser, { headers }).subscribe({
        next: () => {
          this.createdUsername = this.username;
          this.showPopup = true;
        },
        error: (error) => {
          console.error('❌ Error creating account:', error);
          alert('❌ Failed to create account. Please try again.');
        }
      });
    });
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/login']);
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }
}
