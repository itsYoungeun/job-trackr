import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Job {
  company: string;
  image: string;
  position: string;
  salary: string;
  location: string;
  appliedDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private firestore: Firestore) {}

  addJob(job: Job) {
    const jobsRef = collection(this.firestore, 'jobs');
    return addDoc(jobsRef, job);
  }

  getJobs(): Observable<Job[]> {
    const jobsRef = collection(this.firestore, 'jobs');
    return collectionData(jobsRef, { idField: 'id' }) as Observable<Job[]>;
  }
}
