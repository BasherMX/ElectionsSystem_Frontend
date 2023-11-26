import { Component } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {
  datos = [
    { id: 0, nombre: 'Candidato 1', partido: 'PAN'},
    { id: 1, nombre: 'Candidato 2', partido: 'PRI'},
    { id: 2, nombre: 'Candidato 3', partido: 'PRD'},
    { id: 3, nombre: 'Candidato 4', partido: 'PAN'},
    { id: 4, nombre: 'Candidato 5', partido: 'PRI'},
    { id: 5, nombre: 'Candidato 6', partido: 'PRD'},
    { id: 6, nombre: 'Candidato 7', partido: 'PAN'},
    { id: 7, nombre: 'Candidato 8', partido: 'PRI'},
    { id: 8, nombre: 'Candidato 9', partido: 'PRD'},
    { id: 9, nombre: 'Candidato 10', partido: 'MORENA'}
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
