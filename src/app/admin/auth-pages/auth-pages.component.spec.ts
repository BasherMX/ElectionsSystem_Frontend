import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPagesComponent } from './auth-pages.component';

describe('AuthPagesComponent', () => {
  let component: AuthPagesComponent;
  let fixture: ComponentFixture<AuthPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
