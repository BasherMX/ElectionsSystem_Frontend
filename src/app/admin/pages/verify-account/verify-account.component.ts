import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/public/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.less']
})
export class VerifyAccountComponent {

  code = "";
  constructor (
    private VerifyService: LoginService,
    private route: ActivatedRoute,
    private changeRoute: Router){
      this.route.params.subscribe(params => {
        this.code = params['accountId'];
      });
      this.onVerify();

  }


  onVerify(): void {
    // Agrega un retraso de 5 segundos antes de realizar la petición
    setTimeout(() => {
      this.VerifyService.verifyAccount(this.code).subscribe(
        (data) => {
          // Manejo de la respuesta de la API
          console.log('VERIFICADA, CAMBIA A LOGIN:', data);
          this.redirectToAdminLogin();
        },
        (error) => {
          alert('ERROR: ' + error.error.error);
          this.redirectToAdminLogin();
          // Manejo de errores
        }
      );
    }, 3000);
  }
  
  redirectToAdminLogin(): void {
    // Utiliza el servicio Router para navegar después del retraso
    setTimeout(() => {
      this.changeRoute.navigate(['/admin/login']);
    }, 3000);
  }
  



}
