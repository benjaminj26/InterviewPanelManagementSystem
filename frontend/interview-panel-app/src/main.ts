import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CandidateComponent } from './app/candidate/candidate.component';
import {InterviewerComponent} from './app/interviewer/interviewer.component';  
import {InterviewPanelComponent} from './app/interview-panel/interview-panel.component';
import {InterviewScheduleComponent} from './app/interview-schedule/interview-schedule.component';
import {InterviewFeedbackComponent} from './app/interview-feedback/interview-feedback.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
 







