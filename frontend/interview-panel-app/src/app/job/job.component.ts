import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  jobService = inject(JobService);
  fb = inject(FormBuilder);

  jobs: Job[] = [];
  jobForm!: FormGroup;
  editingId: string | null = null;

  ngOnInit(): void {
    // Initialize the form with validators
    this.jobForm = this.fb.group({
      jobId: [''], // This will be generated if empty
      position: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required]
    });

    // Fetch existing jobs to display
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => this.jobs = data,
      error: (err) => console.error('Failed to fetch jobs', err)
    });
  }

  onSubmit(): void {
    const jobData = this.jobForm.value;

    // Ensure jobId is generated if empty (for new job)
    if (!jobData.jobId || jobData.jobId.trim() === '') {
      jobData.jobId = Date.now().toString(); // Generate unique ID based on current timestamp
    }

    // Convert comma-separated string of requirements into an array
    jobData.requirements = jobData.requirements
      .split(',')
      .map((req: string) => req.trim());

    if (this.editingId) {
      // If editing an existing job, call updateJob
      this.jobService.updateJob(this.editingId, jobData).subscribe({
        next: () => {
          this.getJobs(); // Refresh the job list
          this.jobForm.reset(); // Reset the form (reset jobId manually if needed)
          this.editingId = null; // Clear editing state
        },
        error: (err) => console.error('Error updating job:', err)
      });
    } else {
      // If creating a new job, call createJob
      this.jobService.createJob(jobData).subscribe({
        next: () => {
          this.getJobs(); // Refresh the job list
          this.jobForm.reset(); // Reset the form
        },
        error: (err) => console.error('Error creating job:', err) // Log error in case of failure
      });
    }
  }

  onEdit(job: Job): void {
    // Prefill the form for editing
    this.jobForm.patchValue({
      jobId: job.jobId,
      position: job.position,
      description: job.description,
      requirements: job.requirements.join(', ') // Convert array back to comma-separated string
    });
    this.editingId = job.jobId; // Set the editingId to the job's ID
  }

  onDelete(id: string): void {
    // Call deleteJob API to remove the job
    this.jobService.deleteJob(id).subscribe({
      next: () => this.getJobs(), // Refresh the job list after deletion
      error: (err) => console.error('Error deleting job:', err)
    });
  }

  onCancel(): void {
    // Reset the form and clear the editing state
    this.jobForm.reset();
    this.editingId = null;
  }
}
