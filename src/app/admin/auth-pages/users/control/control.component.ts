import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {
  originalData: any;  // Store the original data
  datos: any;
  page = 1;
  itemsPerPage = 6;
  searchText: string = '';

  tipoUser = 0;
  statusInput = 1;

  constructor(private router: Router, private apiService: UsersService) {
    this.getUsersData();
  }

  getUsersData() {
    this.apiService.getAllEnableUsers().subscribe(
      (res) => {
        this.originalData = res;
        this.datos = [...this.originalData]; // Make a copy of the original data
      },
      (err) => {
        alert('ERROR: ' + err.error.error);
      }
    );
  }

  filtrarPorDrops() {
    if (this.tipoUser == 0) {
      this.datos = [...this.originalData]; // Reset to the original data
    }

    if (this.tipoUser == 1) {
      this.datos = this.originalData.filter((item: { user_type: { toString: () => string | string[]; }; name: string; }) =>
        item.user_type.toString().includes("1")
      );
    }

    if (this.tipoUser == 2) {
      this.datos = this.originalData.filter((item: { user_type: { toString: () => string | string[]; }; name: string; }) =>
        item.user_type.toString().includes("2")
      );
    }

    if (this.statusInput == 1) {
      this.datos = this.datos.filter((item: { enable: { toString: () => string | string[]; }; name: string; }) =>
        item.enable.toString().includes("1")
      );
    }

    if (this.statusInput == 0) {
      this.datos = this.datos.filter((item: { enable: { toString: () => string | string[]; }; name: string; }) =>
        item.enable.toString().includes("0")
      );
    }
  }


  buscarNombreId() {
    if (this.searchText.trim() !== '') {
      const searchTextLower = this.searchText.toLowerCase();
      this.datos = this.datos.filter((item: { user_id: string | string[]; name: string; first_lastname: string; second_lastname: string; }) => {
        const userIDs = Array.isArray(item.user_id) ? item.user_id : [item.user_id];
        return userIDs.some(id => id.toString().toLowerCase().includes(searchTextLower)) ||
               item.name.toLowerCase().includes(searchTextLower) ||
               item.first_lastname.toLowerCase().includes(searchTextLower) ||
               item.second_lastname.toLowerCase().includes(searchTextLower);
      });
    } else {
      this.getUsersData();
    }
  }
  
  
  

  editarItem(item: any) {
    console.log('Editar', item);
  }

  borrarItem(item: any) {
    console.log('Borrar', item);
  }

  goToNew() {
    this.router.navigate(["admin/auth/users/new"]);
  }
}
