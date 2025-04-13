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
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private zone: NgZone, private storage: Storage) {
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

  updateProfileImage(userId: string, imageFile: File): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      return Promise.reject('No user logged in');
    }
    const storageRef = ref(this.storage, `user-profiles/${userId}/profile-image`);
    return uploadBytes(storageRef, imageFile)
      .then(snapshot => getDownloadURL(snapshot.ref))
      .then(downloadURL => {
        return updateProfile(currentUser, {
          photoURL: downloadURL
        });
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