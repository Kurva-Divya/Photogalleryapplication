import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terrorist',
  imports: [CommonModule],
  templateUrl: './terrorist.component.html',
  styleUrl: './terrorist.component.css'
})
export class TerroristComponent {
  terroristImages: string[] = [
    'assets/e1.jpg',
    'assets/e2.jpg',
    'assets/e3.jpg',
    'assets/e4.jpg',
    'assets/e5.jpg',
    'assets/e6.jpg',
    'assets/e7.jpg',
    'assets/e8.jpg', 
    'assets/e10.jpg'
    
  ];
}
