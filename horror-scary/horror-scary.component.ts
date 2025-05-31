import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-horror-scary',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './horror-scary.component.html',
  styleUrls: ['./horror-scary.component.css'] // ✅ Fixed: Corrected from `styleUrl` to `styleUrls`
})
export class HorrorScaryComponent {
  Images: string[] = [
    'assets/h1.webp', 'assets/h2.webp', 'assets/h3.webp', 'assets/h4.webp',
    'assets/h5.webp', 'assets/h6.webp', 'assets/h7.webp', 'assets/h8.webp',
    'assets/h9.webp', 'assets/h10.webp'
  ];

  uploadedImages: string[] = [];
  comments: { [key: number]: string[] } = {};
  currentComments: { [key: number]: string } = {};
  ratings: { [key: number]: number } = {}; 
  currentImageIndex: number = 0;

  jsonServerBaseUrl = 'http://localhost:3001/horror-scary';
  commentsUrl = 'http://localhost:3001/horror-scary-comments';
  ratingsUrl = 'http://localhost:3001/horror-scary-ratings';

  constructor(private http: HttpClient) {
    this.fetchUploadedImages();
    this.fetchComments();
    this.fetchRatings();
  }

  fetchUploadedImages() {
    this.http.get<any[]>(this.jsonServerBaseUrl).subscribe(
      (images) => {
        console.log('Fetched Images:', images); // ✅ Debugging
        this.uploadedImages = images.map(img => img.imageUrl);
      },
      (error) => {
        console.error('Error fetching images:', error); // ✅ Debugging
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
        this.currentComments[index] = '';
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
    console.log('All Images:', [...this.uploadedImages, ...this.Images]); // ✅ Debugging
    return [...this.uploadedImages, ...this.Images];
  }
  
}
