import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = environment.backendUrl;

  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) {}

  deleteProfileImage(userId: string, publicId: string) {
    return this.http.post(`${this.apiUrl}/api/image/delete`, {
      public_id: publicId,
      userId
    });
  }

  async saveProfileImageMeta(userId: string, imageUrl: string, publicId: string) {
    const userRef = doc(this.firestore, `users/${userId}`);
    await setDoc(userRef, { photoURL: imageUrl, photoPublicId: publicId }, { merge: true });
  }

  getUserMeta(userId: string) {
    const userRef = doc(this.firestore, `users/${userId}`);
    return docData(userRef);
  }
}