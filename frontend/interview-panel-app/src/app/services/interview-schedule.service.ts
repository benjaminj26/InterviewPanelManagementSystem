import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewSchedule } from '../models/interview-schedule.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterviewScheduleService {
  private apiUrl = 'http://localhost:3000/api/schedules';

  constructor(private http: HttpClient) {}

  getAllSchedules(): Observable<InterviewSchedule[]> {
    return this.http.get<InterviewSchedule[]>(this.apiUrl);
  }

  getScheduleById(id: string): Observable<InterviewSchedule> {
    return this.http.get<InterviewSchedule>(`${this.apiUrl}/${id}`);
  }

  createSchedule(schedule: InterviewSchedule): Observable<InterviewSchedule> {
    return this.http.post<InterviewSchedule>(this.apiUrl, schedule);
  }

  updateSchedule(id: string, schedule: InterviewSchedule): Observable<InterviewSchedule> {
    return this.http.put<InterviewSchedule>(`${this.apiUrl}/${id}`, schedule);
  }

  deleteSchedule(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
