import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isBrowser: boolean;
  activeSlide = 0;
  slideshowImages: string[] = [
    'assets/festival.webp',
    'assets/food.webp',
    'assets/sunrise.webp',
    'assets/na.webp',
    'assets/toy.webp'
  ];

  allowedCategories = {
    Child: [
      'Educational Images', 'Art & Craft', 'Toys & Games', 'Inspirational Figures', 
      'Inspirational Quotes & Messages', 'food', 'Beautiful Sunrises & Sunsets', 
      'Entertainment & Travel', 'Nature & Landscapes', 'Devotional', 'Medical & Anatomy Images'
    ],
    Adult: [
      'Educational Images', 'Art & Craft', 'Toys & Games', 'Inspirational Figures', 
      'Inspirational Quotes & Messages', 'food', 'Beautiful Sunrises & Sunsets', 
      'Entertainment & Travel', 'Nature & Landscapes', 'Devotional', 'Medical & Anatomy Images', 
      'Horror & Scary Content', 'Disturbing News & Tragedies'
    ],
    Older: [
      'Educational Images', 'Art & Craft', 'Toys & Games', 'Inspirational Figures', 
      'Inspirational Quotes & Messages', 'food', 'Beautiful Sunrises & Sunsets', 
      'Entertainment & Travel', 'Nature & Landscapes', 'Devotional', 'Medical & Anatomy Images'
    ]
  };
  
  photoCategories = [
    { name: 'Educational Images', route: '/educational' },
    { name: 'Art & Craft', route: '/art-craft' },
    { name: 'Toys & Games', route: '/toys-games' },
    { name: 'Inspirational Figures', route: '/inspirational-figures' },
    { name: 'Violence & Weapons', route: '/violence-weapons' },
    { name: 'Horror & Scary Content', route: '/horror-scary' },
    { name: 'Disturbing News & Tragedies', route: '/disturbing-news' },
    { name: 'Nature & Landscapes', route: '/nature-landscapes' },
    { name: 'Entertainment & Travel', route: '/entertainment-travel' },
    { name: 'Medical & Anatomy Images', route: '/medical-anatomy' },
    { name: 'Animal Cruelty', route: '/animal-cruelty' },
    { name: 'Terrorist', route: '/terrorist' },
    { name: 'Real-Life Crime Scene Photos', route: '/crime-scene' },
    { name: 'Drug Use & Addiction Promotion Photos', route: '/drug-use' },
    { name: 'Inspirational Quotes & Messages', route: '/inspirational-quotes' },
    { name: 'Beautiful Sunrises & Sunsets', route: '/sunrises-sunsets' },
    { name: 'food', route: '/food' },
    { name: 'Devotional', route: '/devotional' }
  ];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.pattern('^[0-9]{10}$')]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      ageGroup: new FormControl({ value: '', disabled: true }, Validators.required), // Age group is disabled
      photoType: new FormControl('', Validators.required),
      securityQuestion: new FormControl('', Validators.required),
      securityAnswer: new FormControl('', [Validators.required, Validators.minLength(3)]),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    });

    // Listen for changes in the Date of Birth field
    this.registerForm.get('dob')?.valueChanges.subscribe((dobValue) => {
      this.calculateAgeGroup(dobValue);
    });

    if (this.isBrowser) {
      setInterval(() => {
        this.activeSlide = (this.activeSlide + 1) % this.slideshowImages.length;
      }, 3000);
    }
  }

  calculateAgeGroup(dob: string) {
    if (!dob) return;
  
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear(); // Changed 'const' to 'let'
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Now 'age' can be reassigned
    }
  
    let ageGroup = '';
  
    if (age < 18) {
      ageGroup = 'Child';
    } else if (age >= 18 && age < 60) {
      ageGroup = 'Adult';
    } else {
      ageGroup = 'Older';
    }
  
    this.registerForm.get('ageGroup')?.setValue(ageGroup);
  }
  

  isFieldInvalid(field: string): boolean {
    return this.registerForm.controls[field].invalid &&
      (this.registerForm.controls[field].dirty || this.registerForm.controls[field].touched);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.value;
    const selectedAgeGroup = this.registerForm.get('ageGroup')?.value;
    const selectedCategory = formData.photoType;

    if (!this.allowedCategories[selectedAgeGroup as keyof typeof this.allowedCategories]?.includes(selectedCategory)) {
      alert(`You cannot select this category as a ${selectedAgeGroup}.`);
      return;
    }

    if (this.isBrowser) {
      localStorage.setItem('registeredUser', JSON.stringify(formData));
    }

    alert('Registration Successful!');

    const categoryRoute = this.photoCategories.find(cat => cat.name === selectedCategory)?.route;

    if (categoryRoute) {
      this.router.navigate([categoryRoute]);
    } else {
      alert('Invalid Category Selection!');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
