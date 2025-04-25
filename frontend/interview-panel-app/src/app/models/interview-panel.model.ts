import { Interviewer } from './interviewer.model';

export interface InterviewPanel {
    _id?: string;
    panelName: string;
    createdDate?: Date;
    interviewType: 'Technical' | 'HR' | 'Managerial';
    interviewers: Interviewer[]; // Or Interviewer[] if populated from backend
    scheduledDateTime: Date;
  }
  