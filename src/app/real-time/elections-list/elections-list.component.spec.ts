import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionsListComponent } from './elections-list.component';

describe('ElectionsListComponent', () => {
  let component: ElectionsListComponent;
  let fixture: ComponentFixture<ElectionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
