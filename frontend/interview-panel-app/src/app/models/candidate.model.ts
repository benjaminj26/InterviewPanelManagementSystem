export interface Candidate {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    resumeLink: string;
    appliedPosition: string;
    experienceYears: number;
    status: 'Scheduled' | 'Interviewed' | 'Selected' | 'Rejected';
  }
  