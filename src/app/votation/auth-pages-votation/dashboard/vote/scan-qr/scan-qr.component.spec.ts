import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQRComponent } from './scan-qr.component';

describe('ScanQRComponent', () => {
  let component: ScanQRComponent;
  let fixture: ComponentFixture<ScanQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanQRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
