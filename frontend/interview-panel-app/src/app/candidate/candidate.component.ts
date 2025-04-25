import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InterviewPanelApiService } from '../services/interview-panel-api.service';
import { Candidate } from '../models/candidate.model';
import { CandidateService } from '../services/candidate.service';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  interviewPanelApiService = inject(InterviewPanelApiService);
  fb = inject(FormBuilder);
  candidateService = inject(CandidateService);

  candidates: Candidate[] = [];
  candidateForm!: FormGroup;
  editingId: string | null = null;
  jobs: Job[] = [];

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      jobPost: [''],
      resumeLink: [''],
      appliedPosition: [''],
      experienceYears: [0],
      status: ['Scheduled']
    });

    this.getCandidates();
    this.loadJobs();
  }

  loadJobs(): void {
    this.candidateService.getJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Failed to load jobs ', err)
    });
  }

  // Get all candidates from the backend
  getCandidates(): void {
    this.interviewPanelApiService.getCandidates().subscribe({
      next: (data: Candidate[]) => this.candidates = data,
      error: (error) => console.error('Error fetching candidates:', error)
    });
  }

  // Submit the form to create or update a candidate
  onSubmit(): void {
    if (this.editingId) {
      // Update existing candidate
      this.interviewPanelApiService.updateCandidate(this.editingId, this.candidateForm.value).subscribe(() => {
        this.getCandidates();
        this.candidateForm.reset();
        this.editingId = null;
      });
    } else {
      // Create new candidate
      this.interviewPanelApiService.createCandidate(this.candidateForm.value).subscribe(() => {
        this.getCandidates();
        this.candidateForm.reset();
      });
    }
  }

  // Populate form for editing a candidate
  onEdit(candidate: Candidate): void {
    this.candidateForm.patchValue(candidate);
    this.editingId = candidate._id!;
  }

  // Delete a candidate
  onDelete(id: string): void {
    this.interviewPanelApiService.deleteCandidate(id).subscribe(() => this.getCandidates());
  }

  // Reset the form
  onCancel(): void {
    this.candidateForm.reset();
    this.editingId = null;
  }
}
