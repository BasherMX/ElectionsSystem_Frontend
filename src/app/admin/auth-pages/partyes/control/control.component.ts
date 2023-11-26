import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoliticalPartyService } from 'src/app/services/politicalParty/political-party.service';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.less']
})
export class ControlComponent {

  datos: any;

  constructor(private router: Router, private apiService: PoliticalPartyService){
    this.getPartyesData();
  }

  page = 1;
  itemsPerPage = 6; // Cambia este valor según tus necesidades
  searchText: string = '';

  getPartyesData() {
    this.apiService.getAllEnableParties().subscribe(
      (res) => {
        this.datos = res; // Make a copy of the original data
      },
      (err) => {
        alert('ERROR: ' + err.error.error);
      }
    );
  }

  buscarNombreId() {
    if (this.searchText.trim() !== '') {
      const searchTextLower = this.searchText.toLowerCase();
      this.datos = this.datos.filter((item: { party_id: string | string[]; name: string; acronym: string;}) => {
        const partyIDs = Array.isArray(item.party_id) ? item.party_id : [item.party_id];
        return partyIDs.some(id => id.toString().toLowerCase().includes(searchTextLower)) ||
               item.name.toLowerCase().includes(searchTextLower) ||
               item.acronym.toLowerCase().includes(searchTextLower)
      });
    } else {
      this.getPartyesData();
    }
  }

  

  editarItem(item: any) {
    // Lógica para editar el elemento
    console.log('Editar', item);
  }

  borrarItem(item: any) {
    // Lógica para borrar el elemento
    console.log('Borrar', item);
  }

  goToNew(){
    this.router.navigate(["admin/auth/partyes/new"]);
  }

}
