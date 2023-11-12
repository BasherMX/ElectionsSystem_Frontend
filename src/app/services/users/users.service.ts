import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  apiUrl = environment.apiUrl;
  private endpoints = Endpoints.user;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllEnableUsers(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllEnable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllDisableUsers(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllDisable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUserById(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.getById(id);
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createUser(userData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.create;
    return this.http.post(url, userData, { headers: this.getHeaders() });
  }

  updateUser(id: string, userData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.update(id);
    return this.http.patch(url, userData, { headers: this.getHeaders() });
  }

  disableUser(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.disable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }

  enableUser(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.enable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }
}