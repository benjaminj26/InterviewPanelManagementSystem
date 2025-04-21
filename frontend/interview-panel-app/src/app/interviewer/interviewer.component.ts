import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewerService } from '../services/interviewer.service';
import { Interviewer } from '../models/interviewer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-interviewer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.scss']
})
export class InterviewerComponent implements OnInit {
  interviewerService = inject(InterviewerService);
  fb = inject(FormBuilder);

  interviewers: Interviewer[] = [];
  interviewerForm!: FormGroup;
  editingId: string | null = null;

  ngOnInit(): void {
    this.interviewerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      department: [''],
      designation: [''],
      expertiseAreas: ['']
    });

    this.getInterviewers();
  }

  getInterviewers(): void {
    this.interviewerService.getAllInterviewers().subscribe(data => this.interviewers = data);
  }

  onSubmit(): void {
    const formValue = this.interviewerForm.value;
    const processedValue = {
      ...formValue,
      expertiseAreas: formValue.expertiseAreas.split(',').map((s: string) => s.trim())
    };

    if (this.editingId) {
      this.interviewerService.updateInterviewer(this.editingId, processedValue).subscribe(() => {
        this.getInterviewers();
        this.interviewerForm.reset();
        this.editingId = null;
      });
    } else {
      this.interviewerService.createInterviewer(processedValue).subscribe(() => {
        this.getInterviewers();
        this.interviewerForm.reset();
      });
    }
  }

  onEdit(interviewer: Interviewer): void {
    this.interviewerForm.patchValue({
      ...interviewer,
      expertiseAreas: interviewer.expertiseAreas.join(', ')
    });
    this.editingId = interviewer._id!;
  }

  onDelete(id: string): void {
    this.interviewerService.deleteInterviewer(id).subscribe(() => this.getInterviewers());
  }

  onCancel(): void {
    this.interviewerForm.reset();
    this.editingId = null;
  }
}
