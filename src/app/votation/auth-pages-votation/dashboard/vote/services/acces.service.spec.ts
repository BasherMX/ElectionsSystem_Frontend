import { TestBed } from '@angular/core/testing';

import { AccesService } from './acces.service';

describe('AccesService', () => {
  let service: AccesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
