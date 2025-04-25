import { Candidate } from "./candidate.model";
import { InterviewPanel } from "./interview-panel.model";

export interface InterviewSchedule {
    _id?: string;
    candidate: Candidate; // Or Candidate if populated
    panel: InterviewPanel;     // Or InterviewPanel if populated
    scheduledDate: Date;
    startTime: string;
    endTime: string;
  }
  