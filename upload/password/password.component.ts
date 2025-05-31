import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-password',
  templateUrl: './password.component.html',
  imports: [FormsModule, RouterModule, HeaderComponent]
})
export class PasswordComponent {
  email: string = '';

  onResetPassword() {
    if (this.email) {
      console.log(`Reset link sent to ${this.email}`);
    } else {
      console.log('Please enter your email');
    }
  }
}
