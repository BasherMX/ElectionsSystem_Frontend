import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-pages-votation',
  template: `<div class="container-fluid">
              <div class="content">
                <router-outlet></router-outlet>
              </div>
            </div>`,
  styleUrls: ['./auth-pages-votation.component.less'],
})
export class AuthPagesVotationComponent {}
