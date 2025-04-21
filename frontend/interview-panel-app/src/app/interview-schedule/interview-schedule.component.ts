import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InterviewScheduleService } from '../services/interview-schedule.service';
import { CandidateService } from '../services/candidate.service';
import { InterviewPanelService } from '../services/interview-panel.service';
import { InterviewSchedule } from '../models/interview-schedule.model';
import { Candidate } from '../models/candidate.model';
import { InterviewPanel } from '../models/interview-panel.model';

@Component({
  selector: 'app-interview-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interview-schedule.component.html',
  styleUrls: ['./interview-schedule.component.scss']
})
export class InterviewScheduleComponent implements OnInit {
  fb = inject(FormBuilder);
  scheduleService = inject(InterviewScheduleService);
  candidateService = inject(CandidateService);
  panelService = inject(InterviewPanelService);

  scheduleForm!: FormGroup;
  schedules: InterviewSchedule[] = [];
  candidates: Candidate[] = [];
  panels: InterviewPanel[] = [];
  editingId: string | null = null;

  // 🔁 Lookup maps for IDs → objects
  candidateMap = new Map<string, Candidate>();
  panelMap = new Map<string, InterviewPanel>();

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      candidate: [''],
      panel: [''],
      scheduledDate: [''],
      startTime: [''],
      endTime: ['']
    });

    this.loadAllData();
  }

  loadAllData(): void {
    this.getCandidates();
    this.getPanels();
    this.getSchedules();
  }

  getSchedules(): void {
  this.scheduleService.getAllSchedules().subscribe(data => {
    console.log('📄 Schedules fetched:', data);
    this.schedules = data;
  });
}


  getCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(data => {
      this.candidates = data;
      this.candidateMap.clear();
      data.forEach(c => this.candidateMap.set(c._id!, c));
    });
  }

  getPanels(): void {
    this.panelService.getAllPanels().subscribe(data => {
      this.panels = data;
      this.panelMap.clear();
      data.forEach(p => this.panelMap.set(p._id!, p));
    });
  }

  onSubmit(): void {
    const formValue = this.scheduleForm.value;
  
    if (this.editingId) {
      this.scheduleService.updateSchedule(this.editingId, formValue).subscribe(() => {
        this.loadAllData(); // ✅ refresh all: candidates, panels, schedules
        this.scheduleForm.reset();
        this.editingId = null;
      });
    } else {
      this.scheduleService.createSchedule(formValue).subscribe(() => {
        this.loadAllData(); // ✅ refresh all: candidates, panels, schedules
        this.scheduleForm.reset();
      });
    }
  }
  

  onEdit(schedule: InterviewSchedule): void {
    this.scheduleForm.patchValue({
      candidate: schedule.candidate,
      panel: schedule.panel,
      scheduledDate: schedule.scheduledDate ? new Date(schedule.scheduledDate).toISOString().substring(0, 10) : '',
      startTime: schedule.startTime,
      endTime: schedule.endTime
    });
    this.editingId = schedule._id!;
  }

  onDelete(id: string): void {
    this.scheduleService.deleteSchedule(id).subscribe(() => this.getSchedules());
  }

  onCancel(): void {
    this.scheduleForm.reset();
    this.editingId = null;
  }



  getCandidateName(candidate: any): string {
    // 💥 Full object case
    if (candidate && candidate.firstName) {
      return `${candidate.firstName} ${candidate.lastName || ''}`.trim();
    }
  
    // 💾 Fallback to lookup by ID
    if (typeof candidate === 'string') {
      const c = this.candidateMap.get(candidate);
      return c ? `${c.firstName} ${c.lastName}` : 'Unknown';
    }
  
    return 'Unknown';
  }
  
  getPanelName(panel: any): string {
    if (panel && panel.panelName) {
      return panel.panelName;
    }
  
    if (typeof panel === 'string') {
      const p = this.panelMap.get(panel);
      return p ? p.panelName : 'Unknown';
    }
  
    return 'Unknown';
  }

  getFormattedTime(time: string): string {
    if (time) {
      const timeString = `1970-01-01T${time}:00Z`;  // Convert time string to a valid date format
      const date = new Date(timeString);
      
      // Format to 'HH:mm' (24-hour format)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return '-'; // return fallback value if no time is available
  }
  
  
  
}
