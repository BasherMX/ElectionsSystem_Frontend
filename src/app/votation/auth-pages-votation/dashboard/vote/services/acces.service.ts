import { Injectable } from '@angular/core';
import { StepsService } from '../steps.service';

@Injectable({
  providedIn: 'root'
})
export class AccesService {

  constructor(public stepService: StepsService) { }

  estado = "No se detecta ningun rostro";

  acces(id: string) {
    if (this.stepService.currentStep !== 3) {
      return;
    }
    else if (id == 'unknown') {
      this.estado = "No coincide el rostro";
      //console.log('No reconocido en la bd');
      return;
    } else {
      this.stepService.up();
    }
  }
}
