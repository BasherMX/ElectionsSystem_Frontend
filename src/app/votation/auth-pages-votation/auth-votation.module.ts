import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthPagesVotationComponent } from './auth-pages-votation.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPagesVotationComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard',
        loadChildren: () => import('../auth-pages-votation/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthVotationModule { }
