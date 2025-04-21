export interface InterviewPanel {
    _id?: string;
    panelName: string;
    createdDate?: Date;
    interviewType: 'Technical' | 'HR' | 'Managerial';
    interviewers: string[]; // Or Interviewer[] if populated from backend
    scheduledDateTime: Date;
  }
  