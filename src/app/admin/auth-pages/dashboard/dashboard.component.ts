import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  UserTypeBool: string = "1";

  constructor(private authService: AuthService){
    this.checkUserType();
  }

  checkUserType(){
    this.UserTypeBool = this.authService.getUserType();

  }

}
