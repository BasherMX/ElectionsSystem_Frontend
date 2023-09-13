import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less']
})
export class SideBarComponent {

  onMouseEnter() {
    const image = document.getElementById('ballotIcon') as HTMLImageElement;
    if (image) {
      image.src = '../../../../assets/Images/ballot_selected_icon.svg';
    }
  }

  onMouseLeave() {
    const image = document.getElementById('ballotIcon') as HTMLImageElement;
    if (image) {
      image.src = '../../../../assets/Images/ballot_icon.svg';
    }
  }
}
