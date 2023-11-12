import { Component } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {
  datos = [
    { id: 0, cargo: 'Diputacion Federal', status: "Asignada"},
    { id: 1, cargo: 'Gubernatura', status: "Sin asignar"},
    { id: 2, cargo: 'Diputacion Local', status: "Asignada"},
    { id: 3, cargo: 'Presidencia', status: "Asignada"},
    { id: 4, cargo: 'Alcaldia', status: "Asignada"},
    { id: 5, cargo: 'Senaduria', status: "Asignada"},
    { id: 6, cargo: 'Presidencia', status: "Sin asignar"},
    { id: 7, cargo: 'Alcaldia', status: "Asignada"},
    { id: 8, cargo: 'Senaduria', status: "Asignada"}
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
