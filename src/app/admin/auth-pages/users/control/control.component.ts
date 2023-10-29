import { Component } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {
  datos = [
    { id: 0, nombre: 'Usuario 1', tipo: 'Verificador', status: "Inactivo"},
    { id: 1, nombre: 'Usuario 2', tipo: 'Admin SR', status: "Activo" },
    { id: 2, nombre: 'Usuario 3', tipo: 'Admin JR', status: "Activo" },
    { id: 3, nombre: 'Usuario 4', tipo: 'Admin SR', status: "Activo" },
    { id: 4, nombre: 'Usuario 5', tipo: 'Admin JR', status: "Inactivo" },
    { id: 5, nombre: 'Usuario 6', tipo: 'Admin JR', status: "Activo" },
    { id: 6, nombre: 'Usuario 7', tipo: 'Verificador', status: "Activo" },
    { id: 7, nombre: 'Usuario 8', tipo: 'Admin JR', status: "Activo" },
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
