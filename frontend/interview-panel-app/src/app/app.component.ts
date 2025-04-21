import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CandidateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interview-panel-app';
}
