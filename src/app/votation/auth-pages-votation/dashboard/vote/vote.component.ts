import { Component } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.less']
})
export class VoteComponent {

  step: number = 1;

  up(){
    this.step ++;
  }

}
