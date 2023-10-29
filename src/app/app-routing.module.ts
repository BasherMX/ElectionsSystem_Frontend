import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './commonComponents/not-found/not-found.component';
import { DashboardComponent } from './admin/auth-pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/pages/login/login.module').then(m => m.LoginModule),
  },
  { 
    path: 'admin/inicio',
    component: DashboardComponent
  },
  { 
    path: 'admin/partyes',
    loadChildren: () => import('./admin/auth-pages/partyes/partyes.module').then(m => m.PartyesModule),
  },
  { 
    path: 'admin/users',
    loadChildren: () => import('./admin/auth-pages/users/users.module').then(m => m.UsersModule),
  },
  { 
    path: 'votation',
    loadChildren: () => import('./votation/auth-pages-votation/auth-votation.module').then(m => m.AuthVotationModule),
  },
  // { 
  //   path: 'realTime',
  //   loadChildren: () => import('./admin/pages/login/login.module').then(m => m.LoginModule),
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
