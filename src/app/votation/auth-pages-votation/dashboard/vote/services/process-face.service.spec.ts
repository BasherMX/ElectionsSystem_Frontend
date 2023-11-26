import { TestBed } from '@angular/core/testing';

import { ProcessFaceService } from './process-face.service';

describe('ProcessFaceService', () => {
  let service: ProcessFaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessFaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
