import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './commonComponents/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/pages/login/login.module').then(m => m.LoginModule),
  },
  // { 
  //   path: 'realTime',
  //   loadChildren: () => import('./admin/pages/login/login.module').then(m => m.LoginModule),
  // },
  // { 
  //   path: 'system',
  //   loadChildren: () => import('./admin/pages/login/login.module').then(m => m.LoginModule),
  //   // canActivate: [AuthGuard] // add the guard to the canActivate property
  // },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
