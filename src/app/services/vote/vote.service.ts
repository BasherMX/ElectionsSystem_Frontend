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

  // router.get('/getElectorImage/:elector_id', getElectorImage);

  getElectorImage(data:string): Observable<any>{
    const url = this.apiUrl + this.endpoints.getElectorImage(data);
    return this.http.get(url,{ headers: this.getHeaders() });
  }

  verifyCanVote(data: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.verifyCanVote;
    return this.http.post(url,data, { headers: this.getHeaders() });
  }

  getBallotsByExerciseId(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.getBallotsByExerciseId(id);
    return this.http.get(url, { headers: this.getHeaders() });
  }

  voteForCandidate(votes:any): Observable<any> {
    const url = this.apiUrl + this.endpoints.voteForCandidate;
    return this.http.post(url, votes, { headers: this.getHeaders()});
  }
}
