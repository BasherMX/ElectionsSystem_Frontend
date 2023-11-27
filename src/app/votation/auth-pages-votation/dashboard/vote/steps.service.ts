// steps.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  seconds: number = 0;

  private _currentStep = new BehaviorSubject<number>(1);
  currentStep$ = this._currentStep.asObservable();

  constructor() { }

  get currentStep(): number {
    return this._currentStep.getValue();
  }

  set currentStep(value: number) {
    this._currentStep.next(value);
  }

  up() {
    this.currentStep++;
    if (this.currentStep > 5 || this.currentStep < 0) {
      this.currentStep = 1;
    }
    if (this.currentStep == 8 ||  this.currentStep == 5) {
      this.count(6);
    }
    console.log(this.currentStep);
  }

  change(value: number) {
    this.currentStep = value;
    if (value == 0 || value == 8 || value == 5) {
      this.count(10);
    }
  }

  count(num: number) {
    this.seconds = num;
    const intervalId = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        clearInterval(intervalId);
        this.up();
      }
    }, 800);
  }
}