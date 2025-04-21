import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewFeedback } from '../models/interview-feedback.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterviewFeedbackService {
  private apiUrl = 'http://localhost:3000/api/feedbacks';

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<InterviewFeedback[]> {
    return this.http.get<InterviewFeedback[]>(this.apiUrl);
  }

  getFeedbackById(id: string): Observable<InterviewFeedback> {
    return this.http.get<InterviewFeedback>(`${this.apiUrl}/${id}`);
  }

  createFeedback(feedback: InterviewFeedback): Observable<InterviewFeedback> {
    return this.http.post<InterviewFeedback>(this.apiUrl, feedback);
  }

  updateFeedback(id: string, feedback: InterviewFeedback): Observable<InterviewFeedback> {
    return this.http.put<InterviewFeedback>(`${this.apiUrl}/${id}`, feedback);
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
