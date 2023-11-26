import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RealTimeService } from 'src/app/services/realTime/real-time.service';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';


@Component({
  selector: 'app-votation',
  templateUrl: './votation.component.html',
  styleUrls: ['./votation.component.less']
})
export class VotationComponent {
  originalData: any;  // Store the original data
  datos: any;
  page = 1;
  itemsPerPage = 5; // Cambia este valor según tus necesidades
  searchText: string = '';
  stateId = 0;
  statusInput = 0;
  stateList: any;

  constructor(private router: Router, private apiService: ExerciseService, private apiState: RealTimeService){
    this.getExerciseData();
    this.getAllStates();
  }

  redirigir(){
    this.router.navigate(['admin/auth/excercise/new']);
  }

  OpenMachine(item: any) {
    this.router.navigate([`/votation/dashboard/vote/${item}`]);
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

  getExerciseData() {
    this.apiService.getAllEnableExercises().subscribe(
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
      this.datos = [...this.originalData];
    } else {
      this.datos = this.originalData.filter((item: { state_id: number; name: string }) =>
        item.state_id === +this.stateId // Convertir this.stateId a número si es necesario
      );
    }

    if (this.statusInput.toString() == "0") {
      this.datos = this.datos.filter((item: { status: number;}) =>
        item.status === 0
      );
    } else {
      this.datos = this.datos.filter((item: { status: number;}) =>
      item.status === 1
    );
    }
  }
  

  getStateName(id: any): string | null {
    const state = this.stateList.find((item: { state_id: number, name: string }) => item.state_id === id);
    return state ? state.name : "null";
  }

  buscarNombreFecha() {
    if (this.searchText.trim() !== '') {
      const searchTextLower = this.searchText.toLowerCase();
      this.datos = this.originalData.filter((item: { exercise_id: string | string[]; date: string; }) => {
        const userIDs = Array.isArray(item.exercise_id) ? item.exercise_id : [item.exercise_id];
        return userIDs.some(id => id.toString().toLowerCase().includes(searchTextLower)) ||
               item.date.toLowerCase().includes(searchTextLower);
      });
    } else {
      this.datos = [...this.originalData]; // Reset to the original data
    }
  }

}
