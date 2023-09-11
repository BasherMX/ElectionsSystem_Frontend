import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote/vote.component';
import { RouterModule, Routes } from '@angular/router';


const rts: Routes = [
  { path: '', redirectTo: 'vote', pathMatch: 'full'},
  { path: 'vote', component: VoteComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [
    VoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rts)
  ]
})
export class DashboardModule { }
