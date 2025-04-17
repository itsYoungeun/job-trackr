import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  deleteProfileImage(userId: string, publicId: string) {
    return this.http.post(`${this.apiUrl}/api/image/delete`, { userId, publicId });
  }
}
