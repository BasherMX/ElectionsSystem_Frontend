import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent {


  constructor(private router: Router){}

  ngOnInit(){
   setTimeout(() => {
    this.router.navigate(['/admin/login']);
   },5000);
  }

}
