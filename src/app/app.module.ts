import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material

import { LoginComponent } from './admin/pages/login/login.component';
import { NotFoundComponent } from './commonComponents/not-found/not-found.component';
import { DropdownComponent } from './commonComponents/dropdown/dropdown.component';
import { ForgotPasswordComponent } from './admin/pages/forgot-password/forgot-password.component';
import { AuthPagesComponent } from './admin/auth-pages/auth-pages.component';
import { InputComponent } from './commonComponents/input/input.component';
import { BotonComponent } from './commonComponents/boton/boton.component';
import { SideBarComponent } from './admin/adminComponents/side-bar/side-bar.component';
import { NavBarComponent } from './admin/adminComponents/nav-bar/nav-bar.component';
import { AuthPagesVotationComponent } from './votation/auth-pages-votation/auth-pages-votation.component';
import { DashboardOptionComponent } from './admin/adminComponents/dashboard-option/dashboard-option.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DropdownComponent,
    ForgotPasswordComponent,
    AuthPagesComponent,
    InputComponent,
    BotonComponent,
    SideBarComponent,
    NavBarComponent,
    AuthPagesVotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
