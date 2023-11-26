import { Component } from '@angular/core';
import { LoginService } from '../../../services/publicRoutes/login.service';
import { AuthRequest } from 'src/app/interfaces/authRequest.interface';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  authData: AuthRequest = {} as AuthRequest;

  constructor(private loginService: LoginService,
    private userService: UsersService,
    private router: Router) {}

    onLogin(): void {
      console.log("user: " + this.authData.email + " pass: " + this.authData.password);
      this.loginService.loginUser(this.authData).subscribe(
        (data) => {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userType', data.userType);
          sessionStorage.setItem('userName', data.userName);
          sessionStorage.setItem('userTypeName', data.userTypeName);
          this.goToDashboard();
        },
        (error) => {
          alert('ERROR: ' + error.error.error);
        }
      );
    }

  goToDashboard(){
    this.router.navigate(['/admin/auth']);
  }
    
  test(): void {
    this.userService.getAllEnableUsers().subscribe(
      (data) => {
        console.log('Response from getAllEnableUsers:', data);
        
        // Aquí puedes procesar los datos y mostrarlos en una tabla en la consola
        if (Array.isArray(data)) {
          console.table(data);
        } else {
          console.log(data);
        }
      },
      (error) => {
        console.error('Error in getAllEnableUsers:', error);
      }
    );
  }
  
}
