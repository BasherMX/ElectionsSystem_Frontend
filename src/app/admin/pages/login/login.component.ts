import { Component } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
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
    // this.loginService.getData(this.authData).subscribe(
    //   (data) => {
    //     // Manejo de la respuesta de la API
    //     console.log('Response from login service:', data);
    //   },
    //   (error) => {
    //     console.error('Error from login service:', error);
    //     // Manejo de errores
    //   }
    // );
  }
}
