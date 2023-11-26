import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'




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
import { FormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { RealTimeComponent } from './real-time/real-time.component';
import { HttpClientModule } from '@angular/common/http';
import { VerifyAccountComponent } from './admin/pages/verify-account/verify-account.component';




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
    AuthPagesVotationComponent,
    RealTimeComponent,
    VerifyAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WebcamModule,
    HttpClientModule
  ],
  exports:      [ 
    BotonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
