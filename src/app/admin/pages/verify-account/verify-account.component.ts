import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/publicRoutes/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.less']
})
export class VerifyAccountComponent {
  verified = false;
  spinner = true;
  code = "";
  text = "VERIFICANDO CUENTA";

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
          this.verified = true;
          this.spinner = false;
          this.text = data.message;
        },
        (error) => {
          this.spinner = false;
          this.text = error.error.error;
        }
      );
    }, 1500);
  }
  
  redirectToAdminLogin(): void {
    
      this.changeRoute.navigate(['/admin/login']);
  }
  



}
