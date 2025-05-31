import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drug-use',
  imports: [CommonModule],
  templateUrl: './drug-use.component.html',
  styleUrl: './drug-use.component.css'
})
export class DrugUseComponent {
  drugImages: string[] = [
    'assets/c1.jpg',
    'assets/c2.jpg',
    'assets/c3.jpg',
    'assets/c4.jpg',
    'assets/c5.jpg',
    'assets/c6.jpg',
    'assets/c7.jpg',
    'assets/c8.jpg',
    'assets/c9.jpg',
    'assets/c10.jpg'
    
    
  ];
}
