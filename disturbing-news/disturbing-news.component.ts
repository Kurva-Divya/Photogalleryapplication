import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-disturbing-news',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './disturbing-news.component.html',
  styleUrl: './disturbing-news.component.css'
})
export class DisturbingNewsComponent {
  images: string[] = [
    'assets/a.webp', 'assets/b.webp', 'assets/c.webp', 'assets/e.webp',
    'assets/f.webp', 'assets/g.webp', 'assets/h.webp', 'assets/i.webp',
    'assets/j.webp', 'assets/k.webp', 'assets/l.webp', 'assets/n.webp',
    'assets/o.webp', 'assets/p.webp', 'assets/q.webp', 'assets/r.webp'
  ];

  uploadedImages: string[] = [];
  comments: { [key: number]: string[] } = {};
  currentComments: { [key: number]: string } = {};
  ratings: { [key: number]: number } = {}; 
  currentImageIndex: number = 0; // Initialize to first image

  jsonServerBaseUrl = 'http://localhost:3001/disturbing-news'; // ✅ JSON Server URL for Disturbing News category
  commentsUrl = 'http://localhost:3001/disturbing-news-comments'; // ✅ JSON Server URL for storing comments
  ratingsUrl = 'http://localhost:3001/disturbing-news-ratings'; // ✅ JSON Server URL for storing ratings

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