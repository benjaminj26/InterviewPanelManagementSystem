export interface InterviewSchedule {
    _id?: string;
    candidate: string; // Or Candidate if populated
    panel: string;     // Or InterviewPanel if populated
    scheduledDate: Date;
    startTime: string;
    endTime: string;
  }
  