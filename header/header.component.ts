import { Component, inject } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: []
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router); // Inject Router for navigation
  isDarkMode = false;

  // Handle theme change event
  onThemeChange(event: Event) {
    const selectedMode = (event.target as HTMLSelectElement).value;
    this.isDarkMode = this.themeService.setTheme(selectedMode);
  }

  // Logout Confirmation
  onLogout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear(); // Clear session data
      sessionStorage.clear();
      this.router.navigate(['/']); // Redirect to Welcome Page
      setTimeout(() => {
        window.close(); // Try closing the tab (may work in some cases)
      }, 1000);
    }
  }
}
