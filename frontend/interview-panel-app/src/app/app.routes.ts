import { Routes } from '@angular/router';

import { CandidateComponent } from './candidate/candidate.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { InterviewPanelComponent } from './interview-panel/interview-panel.component';
import { InterviewScheduleComponent } from './interview-schedule/interview-schedule.component';
import { InterviewFeedbackComponent } from './interview-feedback/interview-feedback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobComponent } from './job/job.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard'; // adjust path as needed

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'candidates', component: CandidateComponent, canActivate: [AuthGuard] },
  { path: 'interviewers', component: InterviewerComponent, canActivate: [AuthGuard] },
  { path: 'panels', component: InterviewPanelComponent, canActivate: [AuthGuard] },
  { path: 'schedules', component: InterviewScheduleComponent, canActivate: [AuthGuard] },
  { path: 'feedbacks', component: InterviewFeedbackComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobComponent, canActivate: [AuthGuard] },
];
