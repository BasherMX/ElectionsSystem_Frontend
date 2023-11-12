import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class BallotService {

  private apiUrl = environment.apiUrl;
  private endpoints = Endpoints.ballot;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllEnableBallots(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllEnable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllDisableBallots(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllDisable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getBallotById(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.getById(id);
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createBallot(ballotData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.create;
    return this.http.post(url, ballotData, { headers: this.getHeaders() });
  }

  disableBallot(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.disable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }

  enableBallot(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.enable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }
}
