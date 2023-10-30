import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthPagesComponent } from './auth-pages.component';
import { DashboardOptionComponent } from '../adminComponents/dashboard-option/dashboard-option.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { 
        path: 'partyes',
        loadChildren: () => import('../auth-pages/partyes/partyes.module').then(m => m.PartyesModule),
      },
      { 
        path: 'excercise',
        loadChildren: () => import('../auth-pages/elections/elections.module').then(m => m.ElectionsModule),
      },
      { 
        path: 'users',
        loadChildren: () => import('../auth-pages/users/users.module').then(m => m.UsersModule),
      },
      { 
        path: 'users',
        loadChildren: () => import('../auth-pages/users/users.module').then(m => m.UsersModule),
      },
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardOptionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthPagesModule { }
