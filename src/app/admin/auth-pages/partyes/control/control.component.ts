import { Component } from '@angular/core';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {

  datos = [
    { id: 232323, nombre: 'Partido Revolucionario Institucional', acronimo: 'PRI' },
    { id: 201103, nombre: 'Partido de Acción Nacional', acronimo: 'PAN' },
    { id: 3, nombre: 'Movimiento Regeneración Nacional', acronimo: 'MORENA' },
    { id: 4, nombre: 'Partido de la Revolución Democrática', acronimo: 'PRD' },
    { id: 5, nombre: 'Partido del Trabajo', acronimo: 'PT' },
    { id: 6, nombre: 'Partido Verde Ecologista de México', acronimo: 'PVEM' },
    { id: 7, nombre: 'Encuentro Social', acronimo: 'PES' },
  ];
  page = 1;
  itemsPerPage = 6; // Cambia este valor según tus necesidades
  searchText: string = '';

  

  editarItem(item: any) {
    // Lógica para editar el elemento
    console.log('Editar', item);
  }

  borrarItem(item: any) {
    // Lógica para borrar el elemento
    console.log('Borrar', item);
  }

}
