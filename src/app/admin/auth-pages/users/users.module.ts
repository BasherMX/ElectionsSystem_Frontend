import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ControlComponent } from './control/control.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


const rts: Routes = [
  { path: '', redirectTo: 'control', pathMatch: 'full'},
  { path: 'control', component: ControlComponent, pathMatch: 'full' },
  { path: 'edit/:id', component: EditComponent, pathMatch: 'full' },
  { path: 'new', component: NewComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    EditComponent,
    NewComponent,
    ControlComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forChild(rts),
  ]
})
export class UsersModule { }
