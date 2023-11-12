import { Component } from '@angular/core';
import { LoginService } from '../../../services/publicRoutes/login.service';
import { AuthRequest } from 'src/app/interfaces/authRequest.interface';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  authData: AuthRequest = {} as AuthRequest;

  constructor(private loginService: LoginService,
    private userService: UsersService) {}

    onLogin(): void {
      console.log("user: " + this.authData.email + " pass: " + this.authData.password);
      this.loginService.loginUser(this.authData).subscribe(
        (data) => {
          // Manejo de la respuesta de la API
          console.log('Response from login service:', data);
    
          // Almacena el token y la expiración en el sessionStorage de Angular
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('userType', data.userType);
        },
        (error) => {
          alert('ERROR: ' + error.error.error);
          // Manejo de errores
        }
      );
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
