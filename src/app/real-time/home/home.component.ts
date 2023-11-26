import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RealTimeService } from 'src/app/services/realTime/real-time.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public estados: any[] = [];
  public estadoSelecc: any = 0;

  constructor(private apiState:RealTimeService, private router: Router){
    this.getStates();

  }

  getStates(){
    this.apiState.getAllStates().subscribe(
      (res) =>{
        this.estados = res;
      },
      (err) =>{

      }
    ) ;
  }


  public sendState() {
    this.router.navigate(['realTime/election-list/',this.estadoSelecc]);
  }
}
