import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3001/users';  // Update port to 3001

  constructor(private http: HttpClient) {}

  // Save login details in JSON Server
  saveLoginDetails(username: string, password: string): Observable<any> {
    const user = { username, password };

    // Define headers
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.apiUrl, user, { headers });
  }
}
