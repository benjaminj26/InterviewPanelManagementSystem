import { TestBed } from '@angular/core/testing';

import { InterviewPanelApiService } from './interview-panel-api.service';

describe('InterviewPanelApiService', () => {
  let service: InterviewPanelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewPanelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
