import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ControlComponent } from './control/control.component';



@NgModule({
  declarations: [
    EditComponent,
    NewComponent,
    ControlComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
