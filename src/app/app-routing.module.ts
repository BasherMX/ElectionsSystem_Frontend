import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './commonComponents/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/pages/login/login.module').then(m => m.LoginModule),
  },
  { 
    path: 'votation',
    loadChildren: () => import('./votation/auth-pages-votation/auth-votation.module').then(m => m.AuthVotationModule),
  }, 
  { 
    path: 'realTime',
    loadChildren: () => import('./real-time/real-time.module').then(m => m.RealTimeModule),
  },
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
