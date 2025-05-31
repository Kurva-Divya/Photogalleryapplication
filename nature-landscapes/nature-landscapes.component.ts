import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-nature-landscapes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './nature-landscapes.component.html',
  styleUrl: './nature-landscapes.component.css'
})
export class NatureLandscapesComponent {
  natureImages: string[] = [
    'assets/b1.webp',
    'assets/b2.webp',
    'assets/b3.webp',
    'assets/b4.webp',
    'assets/b5.webp',
    'assets/b6.webp',
    'assets/b7.webp',
    'assets/b8.webp',
    'assets/b9.webp',
    'assets/b10.webp',
    'assets/b11.webp',
    'assets/b12.webp',
    'assets/b13.webp',
    'assets/b14.webp',
    'assets/b15.webp',
    'assets/b16.webp',
    'assets/b17.webp',
    'assets/b18.webp',
    'assets/b19.webp',
    'assets/b20.webp'
  ];

  uploadedImages: string[] = [];
  comments: { [key: number]: string[] } = {};
  currentComments: { [key: number]: string } = {};
  ratings: { [key: number]: number } = {}; 
  currentImageIndex: number = 0; // Initialize to first image

  jsonServerBaseUrl = 'http://localhost:3001/nature-landscapes'; // ✅ JSON Server URL for Nature & Landscapes category
  commentsUrl = 'http://localhost:3001/nature-landscapes-comments'; // ✅ JSON Server URL for storing comments
  ratingsUrl = 'http://localhost:3001/nature-landscapes-ratings'; // ✅ JSON Server URL for storing ratings

  constructor(private http: HttpClient) {
    this.fetchUploadedImages();
    this.fetchComments();
    this.fetchRatings();
  }

  fetchUploadedImages() {
    this.http.get<any[]>(this.jsonServerBaseUrl).subscribe((images) => {
      console.log('Fetched images:', images);  // Log to check the structure
      this.uploadedImages = images.map(img => img.imageUrl); // Map the base64 URLs
      console.log('Uploaded Images:', this.uploadedImages); // Log the resulting uploaded image paths
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
    return [...this.uploadedImages, ...this.natureImages];  // Combine both uploaded and static images
  }
  
  
}
