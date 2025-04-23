import { Job } from "./job.model";

export interface Candidate {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    resumeLink: string;
    jobPost: Job;
    experienceYears: number;
    status: 'Scheduled' | 'Interviewed' | 'Selected' | 'Rejected';
  }
  