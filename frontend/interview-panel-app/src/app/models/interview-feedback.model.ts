import { Candidate } from "./candidate.model";
import { InterviewPanel } from "./interview-panel.model";
import { Interviewer } from "./interviewer.model";

export interface InterviewFeedback {
  _id?: string;
  candidate: Candidate; // Candidate type
  interviewer: Interviewer; // Interviewer type
  panel: InterviewPanel; // InterviewPanel type
  feedbackDate?: Date;
  rating: number;
  comments: string;
  recommendation: 'Hire' | 'Hold' | 'Reject';
}
