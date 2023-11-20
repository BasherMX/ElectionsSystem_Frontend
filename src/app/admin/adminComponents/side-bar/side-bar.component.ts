import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less']
})
export class SideBarComponent {
  UserTypeBool: string = "1";

  constructor(private router: Router, private authService: AuthService){
    this.checkUserType();
  }

  checkUserType(){
    this.UserTypeBool = this.authService.getUserType();

  }

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

  onLogOut(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userType');
    this.goToLogin();
  }

  goToLogin(){
  this.router.navigate(['/admin/login']);
}
}
