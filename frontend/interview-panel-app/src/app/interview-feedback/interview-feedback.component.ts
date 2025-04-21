import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InterviewFeedbackService } from '../services/interview-feedback.service';
import { CandidateService } from '../services/candidate.service';
import { InterviewPanelService } from '../services/interview-panel.service';
import { InterviewerService } from '../services/interviewer.service';
import { Candidate } from '../models/candidate.model';
import { InterviewPanel } from '../models/interview-panel.model';
import { Interviewer } from '../models/interviewer.model';
import { InterviewFeedback } from '../models/interview-feedback.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-interview-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.scss']
})
export class InterviewFeedbackComponent implements OnInit {
  fb = inject(FormBuilder);
  feedbackService = inject(InterviewFeedbackService);
  candidateService = inject(CandidateService);
  interviewerService = inject(InterviewerService);
  panelService = inject(InterviewPanelService);

  feedbackForm!: FormGroup;
  feedbacks: InterviewFeedback[] = [];
  candidates: Candidate[] = [];
  interviewers: Interviewer[] = [];
  panels: InterviewPanel[] = [];
  editingId: string | null = null;

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      candidate: [''],
      interviewer: [''],
      panel: [''],
      rating: [''],
      comments: [''],
      recommendation: ['']
    });

    this.getFeedbacks();
    this.getCandidates();
    this.getInterviewers();
    this.getPanels();
  }

  

  // Fetch all feedbacks
  getFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(data => {
      console.log(data); // Debugging the feedback data
      this.feedbacks = data;
    });
  }
  
  

  // Fetch all candidates
  getCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(data => this.candidates = data);
  }

  // Fetch all interviewers
  getInterviewers(): void {
    this.interviewerService.getAllInterviewers().subscribe(data => this.interviewers = data);
  }

  // Fetch all interview panels
  getPanels(): void {
    this.panelService.getAllPanels().subscribe(data => this.panels = data);
  }

  // Handle form submission for new or edited feedback
  onSubmit(): void {
    const formValue = this.feedbackForm.value;
    if (this.editingId) {
      // Update feedback
      this.feedbackService.updateFeedback(this.editingId, formValue).subscribe(() => {
        this.getFeedbacks();
        this.feedbackForm.reset();
        this.editingId = null;
      });
    } else {
      // Create new feedback
      this.feedbackService.createFeedback(formValue).subscribe(() => {
        this.getFeedbacks();
        this.feedbackForm.reset();
      });
    }
  }

  // Prepare form for editing feedback
  onEdit(feedback: InterviewFeedback): void {
    this.feedbackForm.patchValue({
      candidate: feedback.candidate,
      interviewer: feedback.interviewer,
      panel: feedback.panel,
      rating: feedback.rating,
      comments: feedback.comments,
      recommendation: feedback.recommendation
    });
    this.editingId = feedback._id!;
  }

  // // Get the name of the panel from the panel ID
  // getPanelName(panelId: string): string {
  //   const panel = this.panels.find(p => p._id === panelId);
  //   return panel ? panel.panelName : 'Unknown';
  // }

  // // Get the candidate's full name from the candidate ID
  // getCandidateName(candidateId: string): string {
  //   const candidate = this.candidates.find(c => c._id === candidateId);
  //   return candidate ? `${candidate.firstName} ${candidate.lastName}` : 'Unknown';
  // }

  // // Get the interviewer's full name from the interviewer ID
  // getInterviewerName(interviewerId: string): string {
  //   const interviewer = this.interviewers.find(i => i._id === interviewerId);
  //   return interviewer ? `${interviewer.firstName} ${interviewer.lastName}` : 'Unknown';
  // }

  getCandidateName(candidateId: string): string {
    const candidate = this.candidates.find(c => c._id === candidateId);
    return candidate ? `${candidate.firstName} ${candidate.lastName}` : 'Unknown';
  }
  
  getInterviewerName(interviewerId: string): string {
    const interviewer = this.interviewers.find(i => i._id === interviewerId);
    return interviewer ? `${interviewer.firstName} ${interviewer.lastName}` : 'Unknown';
  }
  
  getPanelName(panelId: string): string {
    const panel = this.panels.find(p => p._id === panelId);
    return panel ? panel.panelName : 'Unknown';
  }
  

  // Handle deletion of feedback
  onDelete(id: string): void {
    this.feedbackService.deleteFeedback(id).subscribe(() => this.getFeedbacks());
  }

  // Handle cancel action
  onCancel(): void {
    this.feedbackForm.reset();
    this.editingId = null;
  }
  // getCandidateName(candidateId: string): string {
  //   const candidate = this.candidates.find(c => c._id === candidateId);
  //   return candidate ? `${candidate.firstName} ${candidate.lastName}` : 'Unknown';
  // }
  
  // getInterviewerName(interviewerId: string): string {
  //   const interviewer = this.interviewers.find(i => i._id === interviewerId);
  //   return interviewer ? `${interviewer.firstName} ${interviewer.lastName}` : 'Unknown';
  // }
  
  // getPanelName(panelId: string): string {
  //   const panel = this.panels.find(p => p._id === panelId);
  //   return panel ? panel.panelName : 'Unknown';
  // }
  
}
