import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewPanel } from '../models/interview-panel.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterviewPanelService {
  private apiUrl = 'http://localhost:3000/api/panels';

  constructor(private http: HttpClient) {}

  getAllPanels(): Observable<InterviewPanel[]> {
    return this.http.get<InterviewPanel[]>(this.apiUrl);
  }

  getPanelById(id: string): Observable<InterviewPanel> {
    return this.http.get<InterviewPanel>(`${this.apiUrl}/${id}`);
  }

  createPanel(panel: InterviewPanel): Observable<InterviewPanel> {
    return this.http.post<InterviewPanel>(this.apiUrl, panel);
  }

  updatePanel(id: string, panel: InterviewPanel): Observable<InterviewPanel> {
    return this.http.put<InterviewPanel>(`${this.apiUrl}/${id}`, panel);
  }

  deletePanel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
