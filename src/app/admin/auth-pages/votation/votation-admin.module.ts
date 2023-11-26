import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { VotationComponent } from './votation.component';

const rts: Routes = [
  { path: '', component: VotationComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [
    VotationComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forChild(rts),
  ]
})
export class VotationAdminModule { }

