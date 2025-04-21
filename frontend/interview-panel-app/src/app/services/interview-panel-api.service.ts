import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewPanelApiService {

  private apiUrl = 'http://localhost:3000/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch candidates
  getCandidates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/candidates`);
  }

  // Fetch interviewers
  getInterviewers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/interviewers`);
  }

  // Fetch panels
  getPanels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/panels`);
  }

  // Fetch schedules
  getSchedules(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedules`);
  }

  // Fetch feedbacks
  getFeedbacks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/feedbacks`);
  }

  // Add a new candidate
  addCandidate(candidate: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/candidates`, candidate);
  }

  // Add a new interviewer
  addInterviewer(interviewer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/interviewers`, interviewer);
  }

  // Add a new interview panel
  addPanel(panel: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/panels`, panel);
  }

  // Add a new schedule
  addSchedule(schedule: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedules`, schedule);
  }

  // Add feedback
  addFeedback(feedback: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/feedbacks`, feedback);
  }

  // In interview-panel-api.service.ts
createCandidate(candidate: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/candidates`, candidate);
}

updateCandidate(id: string, candidate: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/candidates/${id}`, candidate);
}

deleteCandidate(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/candidates/${id}`);
}

}
