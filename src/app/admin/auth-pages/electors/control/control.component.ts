import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {
  constructor(private router: Router){}

  datos = [
    { id: 1, nombre: 'Elector 1', clave: 'AAA111', estado: "Aguascalientes" },
    { id: 2, nombre: 'Elector 2', clave: 'BBB222', estado: "Zacatecas" },
    { id: 3, nombre: 'Elector 3', clave: 'CCC333', estado: "Aguascalientes" },
    { id: 4, nombre: 'Elector 4', clave: 'DDD444', estado: "Colima" },
    { id: 5, nombre: 'Elector 5', clave: 'EEE555', estado: "Zacatecas" },
    { id: 6, nombre: 'Elector 6', clave: 'FFF666', estado: "Aguascalientes" },
    { id: 7, nombre: 'Elector 7', clave: 'GGG777', estado: "Colima" },
    { id: 8, nombre: 'Elector 8', clave: 'HHH888', estado: "Zacatecas" },
    { id: 9, nombre: 'Elector 9', clave: 'III999', estado: "Aguascalientes" }
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

  redirigir(){
    this.router.navigate(['admin/electors/new']);
  }
}
