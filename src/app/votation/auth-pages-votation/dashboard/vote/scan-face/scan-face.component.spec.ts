import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanFaceComponent } from './scan-face.component';

describe('ScanFaceComponent', () => {
  let component: ScanFaceComponent;
  let fixture: ComponentFixture<ScanFaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanFaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
