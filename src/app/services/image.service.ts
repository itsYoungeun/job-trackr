import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:5000/api/images';

  constructor(private http: HttpClient) {}

  deleteImage(public_id: string) {
    return this.http.delete(`${this.baseUrl}/delete`, {
      body: { public_id }
    });
  }
}
