import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-animal-cruelty',
  imports: [CommonModule],
  templateUrl: './animal-cruelty.component.html',
  styleUrl: './animal-cruelty.component.css'
})
export class AnimalCrueltyComponent {
  animalImages: string[] = [
    'assets/ac1.jpg',
    'assets/ac2.jpg',
    'assets/ac3.jpg',
    'assets/ac4.jpg',
    'assets/ac5.jpg',
    
    'assets/ac7.jpg',
    
    'assets/ac9.jpg',
    'assets/ac10.jpg'
    
  ];
}
