import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  getAuthToken(): Observable<boolean>{
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');

    return (token && userType) ? of(true) : of(false);
  }

  getUserType(){
    const userType = sessionStorage.getItem('userType');

    return (userType) ? userType.toString() : "0";
  }

}
 