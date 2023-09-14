import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from '../../auth-pages/dashboard/dashboard.component';

const rts: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { 
    path: 'auth',
    loadChildren: () => import('../../auth-pages/auth-pages.module').then(m => m.AuthPagesModule),
    // canActivate: [AuthGuard] // add the guard to the canActivate property
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rts)
  ]
})
export class LoginModule { }