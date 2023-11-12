import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control/control.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { Routes } from '@angular/router';

const rts: Routes = [
  { path: '', redirectTo: 'control', pathMatch: 'full'},
  { path: 'control', component: ControlComponent, pathMatch: 'full' },
  { path: 'edit/:id', component: EditComponent, pathMatch: 'full' },
  { path: 'new', component: NewComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ControlComponent,
    NewComponent,
    EditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ElectorsModule { }
