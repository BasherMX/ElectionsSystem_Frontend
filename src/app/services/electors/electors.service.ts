import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ElectorService {

  private apiUrl = environment.apiUrl;
  private endpoints = Endpoints.elector;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllEnableElectors(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllEnable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllDisableElectors(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllDisable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getElectorById(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.getById(id);
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createElector(electorData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.create;
    return this.http.post(url, electorData, { headers: this.getHeaders() });
  }

  updateElector(id: string, electorData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.update(id);
    return this.http.patch(url, electorData, { headers: this.getHeaders() });
  }

  disableElector(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.disable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }

  enableElector(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.enable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }
}
