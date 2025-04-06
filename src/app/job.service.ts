import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Job {
  id?: string;
  company: string;
  image: string;
  position: string;
  salary: string;
  location: string;
  appliedDate: string;
  status: 'Applied' | 'Rejected' | 'Interview';
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

  updateJobStatus(jobId: string, status: 'Applied' | 'Interview' | 'Rejected') {
    const jobRef = doc(this.firestore, 'jobs', jobId);
    return updateDoc(jobRef, { status });
  }
}
