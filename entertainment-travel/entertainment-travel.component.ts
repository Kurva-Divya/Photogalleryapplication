import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-entertainment-travel',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './entertainment-travel.component.html',
  styleUrl: './entertainment-travel.component.css'
})
export class EntertainmentTravelComponent {
  entertainmentImages: string[] = [
    'assets/t1.webp', 'assets/t2.webp', 'assets/t3.webp', 'assets/t4.webp',
    'assets/t5.webp', 'assets/t6.webp', 'assets/t7.webp', 'assets/t8.webp',
    'assets/t9.webp', 'assets/t10.webp', 'assets/t11.webp', 'assets/t12.webp'
  ];

  uploadedImages: string[] = [];
  comments: { [key: number]: string[] } = {};
  currentComments: { [key: number]: string } = {};
  ratings: { [key: number]: number } = {}; 
  currentImageIndex: number = 0; // Initialize to first image

  jsonServerBaseUrl = 'http://localhost:3001/entertainment-travel'; // ✅ JSON Server URL for Entertainment & Travel category
  commentsUrl = 'http://localhost:3001/entertainment-travel-comments'; // ✅ JSON Server URL for storing comments
  ratingsUrl = 'http://localhost:3001/entertainment-travel-ratings'; // ✅ JSON Server URL for storing ratings

  constructor(private http: HttpClient) {
    this.fetchUploadedImages();
    this.fetchComments();
    this.fetchRatings();
  }

  fetchUploadedImages() {
    this.http.get<any[]>(this.jsonServerBaseUrl).subscribe((images) => {
      this.uploadedImages = images.map(img => img.imageUrl);
      console.log('Uploaded Images:', this.uploadedImages);  // Add a console log to check
    });
  }
  
  
  fetchComments() {
    this.http.get<{ [key: number]: string[] }>(this.commentsUrl).subscribe((data) => {
      this.comments = data || {};
    });
  }

  fetchRatings() {
    this.http.get<{ [key: number]: number }>(this.ratingsUrl).subscribe((data) => {
      this.ratings = data || {};
    });
  }

  submitComment(index: number) {
    if (this.currentComments[index]?.trim()) {
      if (!this.comments[index]) {
        this.comments[index] = [];
      }
      this.comments[index].push(this.currentComments[index]);

      this.http.put(this.commentsUrl, this.comments).subscribe(() => {
        this.currentComments[index] = ''; // Clear input after saving
      });
    }
  }

  setRating(index: number, rating: number) {
    this.ratings[index] = rating;
    this.http.put(this.ratingsUrl, this.ratings).subscribe();
  }

  nextImage() {
    if (this.currentImageIndex < this.getAllImages().length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.getAllImages().length - 1;
    }
  }

  getAllImages(): string[] {
    const allImages = [...this.uploadedImages, ...this.entertainmentImages];
    console.log('All Images:', allImages); // Add a console log to check
    return allImages;
  }
  
}