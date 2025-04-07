import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export interface Job {
  id?: string;
  company: string;
  image: string;
  position: string;
  salary: string;
  location: string;
  appliedDate: string;
  status: 'Applied' | 'Rejected' | 'Interview';
  uid?: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private tempJobs: Job[] = [];
  private tempJobsSubject = new BehaviorSubject<Job[]>([]);

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async addJob(job: Job) {
    const uid = this.authService.getUserId();

    if (uid) {
      const jobWithUid = { ...job, uid };
      const jobsRef = collection(this.firestore, 'jobs');
      return await addDoc(jobsRef, jobWithUid);
    } else {
      this.tempJobs.push(job);
      this.tempJobsSubject.next(this.tempJobs);
      return Promise.resolve();
    }
  }

  getJobs(): Observable<Job[]> {
    const uid = this.authService.getUserId();

    if (uid) {
      const jobsRef = collection(this.firestore, 'jobs');
      const userJobsQuery = query(jobsRef, where('uid', '==', uid));
      return collectionData(userJobsQuery, { idField: 'id' }) as Observable<Job[]>;
    } else {
      return this.tempJobsSubject.asObservable();
    }
  }

  updateJobStatus(jobId: string, status: 'Applied' | 'Interview' | 'Rejected') {
    const jobRef = doc(this.firestore, 'jobs', jobId);
    return updateDoc(jobRef, { status });
  }
}
