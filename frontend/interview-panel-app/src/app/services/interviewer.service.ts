import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interviewer } from '../models/interviewer.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterviewerService {
  private apiUrl = 'http://localhost:3000/api/interviewers';

  constructor(private http: HttpClient) {}

  getAllInterviewers(): Observable<Interviewer[]> {
    return this.http.get<Interviewer[]>(this.apiUrl);
  }

  getInterviewerById(id: string): Observable<Interviewer> {
    return this.http.get<Interviewer>(`${this.apiUrl}/${id}`);
  }

  createInterviewer(interviewer: Interviewer): Observable<Interviewer> {
    return this.http.post<Interviewer>(this.apiUrl, interviewer);
  }

  updateInterviewer(id: string, interviewer: Interviewer): Observable<Interviewer> {
    return this.http.put<Interviewer>(`${this.apiUrl}/${id}`, interviewer);
  }

  deleteInterviewer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
