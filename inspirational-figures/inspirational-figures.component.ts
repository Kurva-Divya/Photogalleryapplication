import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-inspirational-figures',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './inspirational-figures.component.html',
  styleUrl: './inspirational-figures.component.css'
})
export class InspirationalFiguresComponent {
  images: string[] = [
    'assets/mothertheresa.webp',
    'assets/doctor.webp',
    'assets/farmer.webp',
    'assets/sir.webp',
    'assets/albert1.jpg',
    'assets/child.jpg',
    'assets/nelson.jpeg',
    'assets/cjwalker.jpg',
    'assets/abdul.jpeg',
    'assets/art.webp',
    'assets/winner.webp',
    'assets/study.webp',
    'assets/humanisam.webp',
    'assets/lab.webp',
    'assets/apj.webp'
  ];

  uploadedImages: string[] = [];
  comments: { [key: number]: string[] } = {};
  currentComments: { [key: number]: string } = {};
  ratings: { [key: number]: number } = {};
  currentImageIndex: number = 0; // Initialize to first image

  jsonServerBaseUrl = 'http://localhost:3001/inspirational-figures'; // JSON Server URL for Inspirational Figures category
  commentsUrl = 'http://localhost:3001/inspirational-figures-comments'; // JSON Server URL for storing comments
  ratingsUrl = 'http://localhost:3001/inspirational-figures-ratings'; // JSON Server URL for storing ratings

  constructor(private http: HttpClient) {
    this.fetchUploadedImages();
    this.fetchComments();
    this.fetchRatings();
  }

  fetchUploadedImages() {
    this.http.get<any[]>(this.jsonServerBaseUrl).subscribe(
      (images) => {
        console.log("Fetched Images:", images); // Debugging log
        this.uploadedImages = images.map(img => img.imageUrl); // Use imageUrl directly
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
    return [...this.uploadedImages, ...this.images];
  }
}
