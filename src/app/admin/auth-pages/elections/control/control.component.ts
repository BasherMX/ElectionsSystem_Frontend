import { Component } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {
  datos = [
    { id: 0, estado: 'Aguscalientes', fecha: '19-01-2023', status: "En Proceso"},
    { id: 1, estado: 'Campeche', fecha: '19-01-2023', status: "En Proceso" },
    { id: 2, estado: 'Aguscalientes', fecha: '19-01-2023', status: "Finalizada" },
    { id: 3, estado: 'Campeche', fecha: '19-01-2023', status: "Finalizada" },
    { id: 4, estado: 'Aguscalientes', fecha: '19-01-2023', status: "En Proceso" },
    { id: 5, estado: 'Campeche', fecha: '19-01-2023', status: "Finalizada" },
    { id: 6, estado: 'Aguscalientes', fecha: '19-01-2023', status: "Finalizada" },
    { id: 7, estado: 'Campeche', fecha: '19-01-2023', status: "En Proceso" },
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
