import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from '../candidate/candidate.component';
import { InterviewerComponent } from '../interviewer/interviewer.component';
import { InterviewPanelComponent } from '../interview-panel/interview-panel.component';
import { InterviewScheduleComponent } from '../interview-schedule/interview-schedule.component';
import { InterviewFeedbackComponent } from '../interview-feedback/interview-feedback.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CandidateComponent,
    InterviewerComponent,
    InterviewPanelComponent,
    InterviewScheduleComponent,
    InterviewFeedbackComponent,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isMenuOpen = false;

  // 🔧 Add activeTab for tab logic
  activeTab: string = 'candidates'; // Default tab

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
