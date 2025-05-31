import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-art-craft',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './art-craft.component.html',
  styleUrl: './art-craft.component.css'
})
export class ArtCraftComponent {
  images: string[] = [
    'assets/acrylicmandala.webp',
    'assets/artflower.webp',
    'assets/beadedbracelet.webp',
    'assets/Diwalilantern.webp',
    'assets/embroideredcushioncover.webp',
    'assets/handpainted.webp',
    'assets/handmade.webp',
    'assets/newspaper.webp',
    'assets/origamipaper.webp',
    'assets/plasticbottle.webp',
    'assets/watercolor.webp',
    'assets/woodenkeychain.webp',
    'assets/handmadeclaypottery.webp'
  ];

  uploadedImages: string[] = [];
  comments: { [key: number]: string[] } = {};
  currentComments: { [key: number]: string } = {};
  ratings: { [key: number]: number } = {}; 
  currentImageIndex: number = 0; // Initialize to first image

  jsonServerBaseUrl = 'http://localhost:3001/art-craft'; // ✅ JSON Server URL for Art & Craft category
  commentsUrl = 'http://localhost:3001/art-craft-comments'; // ✅ JSON Server URL for storing comments
  ratingsUrl = 'http://localhost:3001/art-craft-ratings'; // ✅ JSON Server URL for storing ratings

  constructor(private http: HttpClient) {
    this.fetchUploadedImages();
    this.fetchComments();
    this.fetchRatings();
  }

  fetchUploadedImages() {
    this.http.get<any[]>(this.jsonServerBaseUrl).subscribe((images) => {
      this.uploadedImages = images.map(img => img.imageUrl);
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
      this.currentImageIndex = 0; // Loop back to first image
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.getAllImages().length - 1; // Loop back to last image
    }
  }

  getAllImages(): string[] {
    return [...this.uploadedImages, ...this.images];
  }
}
