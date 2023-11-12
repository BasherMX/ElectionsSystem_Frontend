import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent {
  constructor(private router: Router){}

  redirigir(){
    this.router.navigate(['admin/boletas/new']);
  }
}
