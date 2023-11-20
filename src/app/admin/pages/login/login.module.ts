import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';
import { AuthGGuard } from 'src/app/services/auth/auth-g.guard';

const rts: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'verifyAccount/:accountId', component: VerifyAccountComponent, pathMatch: 'full' },
  { 
    path: 'auth',
    loadChildren: () => import('../../auth-pages/auth-pages.module').then(m => m.AuthPagesModule),
    canActivate: [AuthGGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rts),
    FormsModule
  ]
})
export class LoginModule { }
