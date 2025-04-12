import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, addDoc, doc, updateDoc, getDocs } from '@angular/fire/firestore';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Job } from '../core/models/job.model';

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
    return new Observable((observer) => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const jobsRef = collection(this.firestore, 'jobs');
          const q = query(jobsRef, where('uid', '==', user.uid));
          const snapshot = await getDocs(q);
          const jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job));
          observer.next(jobs);
        } else {
          observer.next([]);
        }
      });
    });
  }

  updateJobStatus(jobId: string, status: 'Pending' | 'Interview' | 'Rejected') {
    const jobRef = doc(this.firestore, 'jobs', jobId);
    return updateDoc(jobRef, { status });
  }

  updateJobDescription(jobId: string, description: string) {
    const jobRef = doc(this.firestore, `jobs/${jobId}`);
    return updateDoc(jobRef, { description });
  }  
}
