import { Component } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent {
  showModal = false;
  modalStep = 0;
  isRegistered = false;


  openModal(){
    this.showModal = true;
    this.modalStep = 1;
  }

  phaseTwo(){
    this.modalStep = 2;
  }

  phaseThree(){ 
    this.modalStep = 3;
  }

  closeModal(){
    this.showModal = false;
    this.modalStep = 0;
  }

  registerCandidate(){
    this.isRegistered = true;
    this.phaseTwo();
  }

  finalStep(){

    this.closeModal();
  }
}
