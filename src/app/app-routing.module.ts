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
    path: 'admin/dashboard',
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
    path: 'admin/boletas',
    loadChildren: () => import('./admin/auth-pages/boletas/boletas.module').then(m => m.BoletasModule),
  },
  { 
    path: 'admin/candidates',
    loadChildren: () => import('./admin/auth-pages/candidates/candidates.module').then(m => m.CandidatesModule),
  },
  { 
    path: 'admin/elections',
    loadChildren: () => import('./admin/auth-pages/elections/elections.module').then(m => m.ElectionsModule),
  },
  { 
    path: 'admin/electors',
    loadChildren: () => import('./admin/auth-pages/electors/electors.module').then(m => m.ElectorsModule),
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
