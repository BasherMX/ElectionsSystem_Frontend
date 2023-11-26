import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {

   name = sessionStorage.getItem('userName');
   userTypeName = sessionStorage.getItem('userTypeName');

}
