import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/interfaces/authRequest.interface';
import { Endpoints } from '../endpoints';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  //login
  public loginUser (data: AuthRequest) : Observable<any>{
    return this.http.post<any>(this.apiUrl + Endpoints.public.login, data);
  }


  public verifyAccount (data: string) : Observable<any>{
    return this.http.post<any>(this.apiUrl + Endpoints.public.verifyAccount(data), data);
  }


}
