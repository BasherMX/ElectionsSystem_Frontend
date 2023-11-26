import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  private apiUrl = environment.apiUrl;
  private endpoints = Endpoints.realTime;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getBallotsByExerciseId(id:any): Observable<any> {
    const url = this.apiUrl + this.endpoints.getBallotsByExerciseId +"/"+id;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllStates(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllStates;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
