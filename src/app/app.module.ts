import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './admin/pages/login/login.component';
import { NotFoundComponent } from './commonComponents/not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DropdownComponent } from './commonComponents/dropdown/dropdown.component';
import { ForgotPasswordComponent } from './admin/pages/forgot-password/forgot-password.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DropdownComponent,
    ForgotPasswordComponent
  ],
  imports: [
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
