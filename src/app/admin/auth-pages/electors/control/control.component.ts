import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectorService } from 'src/app/services/electors/electors.service';
import { RealTimeService } from 'src/app/services/realTime/real-time.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {
  originalData: any;  // Store the original data
  datos: any;

  constructor(private router: Router, private apiService: ElectorService, private apiState: RealTimeService){
    this.getElectorsData();
    this.getAllStates();
  }

  page = 1;
  itemsPerPage = 6; // Cambia este valor según tus necesidades
  searchText: string = '';
  stateId = 0;
  stateList: any;

  editarItem(item: any) {
    // Lógica para editar el elemento
    console.log('Editar', item);
  }

  borrarItem(item: any) {
    // Lógica para borrar el elemento
    console.log('Borrar', item);
  }

  getAllStates(){
    this.apiState.getAllStates().subscribe(
      (res) => {
        this.stateList = res;
      },
      (err) => {
        alert('ERROR: ' + err.error.error);
      }
    );
  }

  getElectorsData() {
    this.apiService.getAllEnableElectors().subscribe(
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
    console.log("estado: " + this.stateId);
  
    if (this.stateId.toString() == "0") {
      this.datos = [...this.originalData]; // Reset to the original data
      console.log("restarted");
    } else {
      console.log("filtrando por estadoId: " + this.stateId);
      this.datos = this.originalData.filter((item: { state_id: number; name: string }) =>
        item.state_id === +this.stateId // Convertir this.stateId a número si es necesario
      );
    }
  }
  

  getStateName(id: any): string | null {
    const state = this.stateList.find((item: { state_id: number, name: string }) => item.state_id === id);
    return state ? state.name : "null";
  }
  

  buscarNombreId() {
    if (this.searchText.trim() !== '') {
      const searchTextLower = this.searchText.toLowerCase();
      this.datos = this.originalData.filter((item: { elector_id: string | string[]; name: string; first_lastname: string; second_lastname: string; }) => {
        const userIDs = Array.isArray(item.elector_id) ? item.elector_id : [item.elector_id];
        return userIDs.some(id => id.toString().toLowerCase().includes(searchTextLower)) ||
               item.name.toLowerCase().includes(searchTextLower) ||
               item.first_lastname.toLowerCase().includes(searchTextLower) ||
               item.second_lastname.toLowerCase().includes(searchTextLower);
      });
    } else {
      this.datos = [...this.originalData]; // Reset to the original data
    }
  }

  redirigir(){
    this.router.navigate(['admin/auth/electors/new']);
  }
}
