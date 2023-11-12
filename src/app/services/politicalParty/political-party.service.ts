import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PoliticalPartyService {

  private apiUrl = environment.apiUrl;
  private endpoints = Endpoints.politicalParty;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllEnableParties(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllEnable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllDisableParties(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllDisable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getPartyById(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.getById(id);
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createParty(partyData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.create;
    return this.http.post(url, partyData, { headers: this.getHeaders() });
  }

  updateParty(id: string, partyData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.update(id);
    return this.http.patch(url, partyData, { headers: this.getHeaders() });
  }

  disableParty(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.disable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }

  enableParty(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.enable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }
}
