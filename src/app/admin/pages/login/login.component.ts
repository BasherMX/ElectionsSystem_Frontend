import { Component } from '@angular/core';
import { LoginService } from '../../../services/public/login.service';
import { AuthRequest } from 'src/app/interfaces/authRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  authData: AuthRequest = {} as AuthRequest;

  constructor(private loginService: LoginService) {
  }

  onLogin(): void {
    console.log("user: " + this.authData.email + " pass: " + this.authData.password);
    this.loginService.loginUser(this.authData).subscribe(
      (data) => {
        // Manejo de la respuesta de la API
        console.log('Response from login service:', data);
      },
      (error) => {
        alert('ERROR:  ' + error.error.error);
        // Manejo de errores
      }
    );
  }
}
