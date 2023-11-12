import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private apiUrl = environment.apiUrl;
  private endpoints = Endpoints.vote;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  verifyCanVote(): Observable<any> {
    const url = this.apiUrl + this.endpoints.verifyCanVote;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getBallotsByExerciseId(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getBallotsByExerciseId;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  voteForCandidate(): Observable<any> {
    const url = this.apiUrl + this.endpoints.voteForCandidate;
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }
}
