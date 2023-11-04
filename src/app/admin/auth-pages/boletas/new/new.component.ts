import { Component } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent {
  showModal = false;

  openModal(){
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }
}
