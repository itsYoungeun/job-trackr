import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private zone: NgZone) {
    onAuthStateChanged(this.auth, (user) => {
      this.zone.run(() => {
        this.currentUserSubject.next(user);
      });
    });
  }

  getUserId(): string | null {
    return this.currentUserSubject.value?.uid || null;
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async updateProfileImage(userId: string, imageFile: File): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return Promise.reject('No user logged in');

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'Job Trackr');
    formData.append('folder', `user-profiles/${userId}`);

    const res = await fetch('https://api.cloudinary.com/v1_1/dsx2dmd0f/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await res.json();
    const imageUrl = data.secure_url;

    return updateProfile(currentUser, {
      photoURL: imageUrl,
    });
  }

  updateDisplayName(userId: string, displayName: string): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      return Promise.reject('No user logged in');
    }
    return updateProfile(currentUser, {
      displayName: displayName
    });
  }
}
