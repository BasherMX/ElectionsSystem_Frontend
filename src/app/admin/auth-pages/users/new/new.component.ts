import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent {
  nombre: string = "";
  apellidoPaterno: string = "";
  apellidoMaterno: string = "";
  tipoAdministrador: string = "";
  correoElectronico: string = "";

  constructor(private userService: UsersService, private router: Router) { }

  registrarUsuario() {
    // Verifica que todos los campos estén llenos
    if (this.nombre && this.apellidoPaterno && this.apellidoMaterno && this.tipoAdministrador && this.correoElectronico) {
      // Crea un objeto con los datos del nuevo usuario
      const nuevoUsuario = {
        name: this.nombre,
        first_lastname: this.apellidoPaterno,
        second_lastname: this.apellidoMaterno,
        user_type: this.tipoAdministrador,
        email: this.correoElectronico
      };

      this.userService.createUser(nuevoUsuario).subscribe(
        (respuesta) => {
          console.log('Usuario registrado exitosamente:', respuesta);
          // Navega a "admin/auth/users" después de un registro exitoso
          this.router.navigate(['admin/auth/users']);
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    } else {
      console.warn('Por favor, complete todos los campos antes de registrar.');
    }
  }
}
