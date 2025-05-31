import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-crime-scene',
  imports: [CommonModule],
  templateUrl: './crime-scene.component.html',
  styleUrl: './crime-scene.component.css'
})
export class CrimeSceneComponent {
  crimeImages: string[] = [
    'assets/d1.jpg',
    'assets/d2.webp',
    'assets/d4.jpg',
    'assets/d5.jpg',
    'assets/d6.jpg',
    'assets/d8.jpg',
    'assets/d9.jpg'
    
    
  ];
}
