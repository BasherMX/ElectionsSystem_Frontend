import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote/vote.component';
import { RouterModule, Routes } from '@angular/router';
import { ScanQRComponent } from './vote/scan-qr/scan-qr.component';
import { ScanFaceComponent } from './vote/scan-face/scan-face.component';


const rts: Routes = [
  { path: '', redirectTo: 'vote', pathMatch: 'full'},
  { path: 'vote', component: VoteComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [
    VoteComponent,
    ScanQRComponent,
    ScanFaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rts)
  ]
})
export class DashboardModule { }
