import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = environment.apiUrl;
  private endpoints = Endpoints.exercise;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllEnableExercises(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllEnable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getAllDisableExercises(): Observable<any> {
    const url = this.apiUrl + this.endpoints.getAllDisable;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getExerciseById(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.getById(id);
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createExercise(exerciseData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.create;
    return this.http.post(url, exerciseData, { headers: this.getHeaders() });
  }

  updateExercise(id: string, exerciseData: any): Observable<any> {
    const url = this.apiUrl + this.endpoints.update(id);
    return this.http.patch(url, exerciseData, { headers: this.getHeaders() });
  }

  disableExercise(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.disable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }

  enableExercise(id: string): Observable<any> {
    const url = this.apiUrl + this.endpoints.enable(id);
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }

  getAllNotAssignedExercises(): Observable<any> {
    const url = this.apiUrl + this.endpoints.notAssigned;
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }
}
