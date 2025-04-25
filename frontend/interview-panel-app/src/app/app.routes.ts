// import { Routes } from '@angular/router';

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


export const routes:  Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'dashboard',component:DashboardComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
    // { path: '', component: DashboardComponent },
    { path: 'candidates', component: CandidateComponent },
    { path: 'interviewers', component: InterviewerComponent },
    { path: 'panels', component: InterviewPanelComponent },
    { path: 'schedules', component: InterviewScheduleComponent },
    { path: 'feedbacks', component: InterviewFeedbackComponent },
    { path: 'jobs', component: JobComponent },
  ];