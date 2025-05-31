import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent]
})
export class LoginComponent {
  loginForm: FormGroup;
  adminForm: FormGroup;
  errorMessage: string = '';
  adminErrorMessage: string = '';
  apiUrl = 'http://localhost:3001/users';

  showPassword: boolean = false;
  isPopupVisible: boolean = false;
  popupMessage: string = '';
  nextPageRoute: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // User login form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Admin login form
    this.adminForm = this.fb.group({
      adminEmail: ['', [Validators.required, Validators.email]],
      adminPassword: ['', Validators.required]
    });
  }

  /** Toggle password visibility */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /** Handle User Login */
  onSubmit() {
    if (!this.loginForm.valid) {
      this.errorMessage = '❌ Please fill all required fields!';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (users) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.popupMessage = `✅ Login Successful!\nWelcome, ${username}!`;
          this.nextPageRoute = '/register'; // Redirect to Register Page
          this.isPopupVisible = true;
        } else {
          this.errorMessage = '❌ Invalid username or password!';
        }
      },
      error: () => {
        this.errorMessage = '❌ Error connecting to the server!';
      }
    });
  }

  /** Handle Admin Login */
  onAdminLogin() {
    const { adminEmail, adminPassword } = this.adminForm.value;

    if (adminEmail === 'divya@gmail.com' && adminPassword === 'divya@0107') {
      this.popupMessage = `✅ Admin Login Successful!\nWelcome, Admin!`;
      this.nextPageRoute = '/upload'; // Redirect to Upload Page
      this.isPopupVisible = true;
    } else {
      this.adminErrorMessage = '❌ Invalid admin credentials!';
    }
  }

  /** Close Popup and Navigate */
  closePopup() {
    this.isPopupVisible = false;
    this.router.navigate([this.nextPageRoute]);
  }

  /** Navigate to Forgot Password */
  navigateToForgotPassword() {
    this.router.navigate(['/password']);
  }

  /** Navigate to Create Account */
  navigateToCreateAccount() {
    this.router.navigate(['/create']);
  }
}
