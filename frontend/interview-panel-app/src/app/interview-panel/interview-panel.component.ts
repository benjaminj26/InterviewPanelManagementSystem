import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewPanelService } from '../services/interview-panel.service';
import { InterviewerService } from '../services/interviewer.service';
import { InterviewPanel } from '../models/interview-panel.model';
import { Interviewer } from '../models/interviewer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-interview-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './interview-panel.component.html',
  styleUrls: ['./interview-panel.component.scss']
})
export class InterviewPanelComponent implements OnInit {
  panelService = inject(InterviewPanelService);
  interviewerService = inject(InterviewerService);
  fb = inject(FormBuilder);

  panelForm!: FormGroup;
  interviewers: Interviewer[] = [];
  panels: InterviewPanel[] = [];
  editingId: string | null = null;

  ngOnInit(): void {
    this.panelForm = this.fb.group({
      panelName: [''],
      interviewType: ['Technical'],
      interviewers: [[]],
      scheduledDateTime: ['']
    });

    this.getPanels();
    this.getInterviewers();
  }

  getInterviewers(): void {
    this.interviewerService.getAllInterviewers().subscribe(data => this.interviewers = data);
  }

  getPanels(): void {
    this.panelService.getAllPanels().subscribe(data => this.panels = data);
  }

  onSubmit(): void {
    const formValue = this.panelForm.value;
    if (this.editingId) {
      this.panelService.updatePanel(this.editingId, formValue).subscribe(() => {
        this.getPanels();
        this.panelForm.reset();
        this.editingId = null;
      });
    } else {
      this.panelService.createPanel(formValue).subscribe(() => {
        this.getPanels();
        this.panelForm.reset();
      });
    }
  }

  onEdit(panel: InterviewPanel): void {
    this.panelForm.patchValue({
      panelName: panel.panelName,
      interviewType: panel.interviewType,
      interviewers: panel.interviewers,
      // Convert Date to string in the required format (e.g., 'YYYY-MM-DDTHH:MM')
      scheduledDateTime: panel.scheduledDateTime ? panel.scheduledDateTime.toISOString().substring(0, 16) : '',
    });
    this.editingId = panel._id!;
  }

  onDelete(id: string): void {
    this.panelService.deletePanel(id).subscribe(() => this.getPanels());
  }

  onCancel(): void {
    this.panelForm.reset();
    this.editingId = null;
  }
  onCheck(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const interviewerId = checkbox.value;
    const currentValues = this.panelForm.value.interviewers || [];
  
    if (checkbox.checked) {
      if (!currentValues.includes(interviewerId)) {
        this.panelForm.patchValue({ interviewers: [...currentValues, interviewerId] });
      }
    } else {
      this.panelForm.patchValue({
        interviewers: currentValues.filter((id: string) => id !== interviewerId)
      });
    }
  }
  
}
// export class PanelComponent {}