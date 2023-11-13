import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ElectionsListComponent } from './elections-list/elections-list.component';
import { ResultsComponent } from './results/results.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'election-list/:id', component: ElectionsListComponent, pathMatch: 'full' },
  { path: 'results/:id', component: ResultsComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    HomeComponent,
    ElectionsListComponent,
    ResultsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RealTimeModule { }
