import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPagesVotationComponent } from './auth-pages-votation.component';

describe('AuthPagesVotationComponent', () => {
  let component: AuthPagesVotationComponent;
  let fixture: ComponentFixture<AuthPagesVotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPagesVotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPagesVotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
