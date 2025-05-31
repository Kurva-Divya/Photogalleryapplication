import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-inspirational-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './inspirational-quotes.component.html',
  styleUrl: './inspirational-quotes.component.css'
})
export class InspirationalQuotesComponent {
  inspirationalImages: string[] = [
    'assets/f1.jpg', 'assets/f2.jpg', 'assets/f3.webp', 'assets/f4.jpg',
    'assets/f5.jpg', 'assets/f6.jpg', 'assets/f7.jpg', 'assets/f8.jpg',
    'assets/f9.jpg', 'assets/f10.jpg'
  ];

  uploadedImages: string[] = [];
  comments: { [key: number]: string[] } = {};
  currentComments: { [key: number]: string } = {};
  ratings: { [key: number]: number } = {}; 
  currentImageIndex: number = 0; // Initialize to first image

  jsonServerBaseUrl = 'http://localhost:3001/inspirational-quotes'; // ✅ JSON Server URL for Inspirational Quotes category
  commentsUrl = 'http://localhost:3001/inspirational-quotes-comments'; // ✅ JSON Server URL for storing comments
  ratingsUrl = 'http://localhost:3001/inspirational-quotes-ratings'; // ✅ JSON Server URL for storing ratings

  constructor(private http: HttpClient) {
    this.fetchUploadedImages();
    this.fetchComments();
    this.fetchRatings();
  }

  fetchUploadedImages() {
    this.http.get<any[]>(this.jsonServerBaseUrl).subscribe(
      (images) => {
        console.log("Fetched Images from JSON Server:", images);
        this.uploadedImages = images.map(img => img.imageUrl);
      },
      (error) => {
        console.error("Error fetching images:", error);
      }
    );
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
    return [...this.uploadedImages, ...this.inspirationalImages];
  }
}
