import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/interfaces/authRequest.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private  apiUrl = environment.apiUrl;




  constructor(private http: HttpClient) { }


  //login
  public getData (data: AuthRequest) : Observable<any>{
    let endpoint = "/public/loginUser";
    return this.http.post<any>(this.apiUrl + endpoint, data);
  }


}
