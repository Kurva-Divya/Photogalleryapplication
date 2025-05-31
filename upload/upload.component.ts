import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-upload',
  standalone: true, 
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UploadComponent {
  selectedFile: File | null = null;
  selectedCategory: string = '';
  errorMessage: string = '';
  categories = [
    'Food',
    'sunrises-sunsets', 
    'inspirational-quotes',
    'medical-anatomy',
    'entertainment-travel',
    'nature-landscapes',
    'disturbing-news',
    'horror-scary',
    'inspirational-figures',
    'toys-games',
    'art-craft',
    'educational',
    'devotional'
  ];

  jsonServerBaseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile && this.selectedFile.size > 150 * 1024) { // ✅ Updated size limit to 150KB
      this.errorMessage = 'File size should be 150KB or less!';
      this.selectedFile = null;
    } else {
      this.errorMessage = '';
    }
  }

  uploadImage() {
    if (!this.selectedFile || !this.selectedCategory) {
      alert('Please select a category and an image file.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const imageData = {
        id: new Date().getTime(),
        imageUrl: reader.result
      };

      // ✅ Convert category name into a valid JSON Server endpoint
      const categoryKey = this.selectedCategory.toLowerCase().replace(/ & | /g, '-');
      const categoryUrl = `${this.jsonServerBaseUrl}/${categoryKey}`;

      // ✅ Store the image in the correct category in JSON Server
      this.http.post(categoryUrl, imageData).subscribe(() => {
        alert('Image uploaded successfully to ' + this.selectedCategory);
        
        // ✅ Redirect to the selected category component after successful upload
        this.router.navigate([`/${categoryKey}`]);
      });
    };
  }
}
