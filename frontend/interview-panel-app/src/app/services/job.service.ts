// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/all`);
  }

  createJob(job: Job): Observable<Job> {
    console.log(job);
    return this.http.post<Job>(this.baseUrl, job); // ✅ don't add /jobs again
  }

  updateJob(id: string, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}?jobId=${id}`, job);
  }

  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}?jobId=${id}`);
  }
}
