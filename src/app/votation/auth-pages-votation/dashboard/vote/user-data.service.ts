import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private id: string = '';
  private name: string = '';
  private estado: string = '';

  constructor() { }

  getId(): string {
    console.log("service id get: " + this.id);
    return this.id;
  };

  setId(value: string) {
    this.id = value;
    console.log("servie id: " + this.id);
  };

  getName(): string {
    return this.name;
  };

  setName(value: string) {
    this.name = value;
  };

  getEstado(): string {
    return this.estado;
  };

  setEstado(value: string) {
    this.estado = value;
  };

}
