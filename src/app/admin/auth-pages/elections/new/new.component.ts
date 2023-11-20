import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { RealTimeService } from 'src/app/services/realTime/real-time.service';
import { Candidate } from 'src/app/interfaces/candidate.interface';
import { Ballot } from 'src/app/interfaces/ballot.interface';
import { PoliticalPartyService } from 'src/app/services/politicalParty/political-party.service';
import { BallotService } from 'src/app/services/ballot/ballot.service';
import { politicalParty } from 'src/app/interfaces/politicalParty.interface';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent {
  @ViewChild('modal') modal!: ElementRef;
  ejercicio: any = {};
  ejercicioId: any = "AGS1FCBFBA";
  stateList: any;
  PartiesList: politicalParty[];
  PartiesListAux: politicalParty[];
  modalRef: any;
  step = 1;
  ballotStep = 1;
  BallotList: Ballot[];
  BallotAux: Ballot ={
    charge_id: 0, 
    exercise_id: "0", 
    candidates :[]
  };
  CandidateAux: Candidate ={
    name: "", 
    first_lastname: "", 
    second_lastname: "", 
    pseudonym: "", 
    party_id: 0
  };
  chargeOptions: { id: string, name: string }[] = [
    { id: '1', name: 'Presidencia' },
    { id: '2', name: 'Gubernatura' },
    { id: '3', name: 'Alcaldía' },
    { id: '4', name: 'Diputación Federal' },
    { id: '5', name: 'Diputación Local' },
    { id: '6', name: 'Senaduría' }
];
chargeOptionsAux = [...this.chargeOptions];

    getIdToName(id: string | number): string | null {
      const charge = this.chargeOptions.find(option => option.id.toString() === id.toString());
      return charge ? charge.name : null;
    }


  constructor(
    private router: Router, 
    private ejercicioService: ExerciseService,
    private apiState: RealTimeService,
    private apiParties: PoliticalPartyService,
    private apiBallot: BallotService
    
    ) {
      this.BallotList = [];
      this.PartiesList = [];
      this.PartiesListAux = [];
      this.getAllStates();
      this.getAllParties();

      const id = '2';
      const name = this.getIdToName(id);
  }

  getAllParties(){
    this.apiParties.getAllEnableParties().subscribe(
      (res) => {
        this.PartiesList = res;
        this.PartiesListAux = [...this.PartiesList];
      },
      (err) => {
        alert('ERROR: ' + err.error.error);
      }
    );
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

  getPartyName(id:  number): string | null {
    const acronym = this.PartiesList.find(option => option.party_id.toString() == id.toString());
    return acronym ? acronym.acronym : null;
  }
  
  removeParty(id:  number): string | null {
    const acronym = this.PartiesListAux.find(option => option.party_id.toString() == id.toString());
    return acronym ? acronym.acronym : null;
  }


  showCandidateRegister(){
    this.ballotStep = 3;
  }

  moveBallotStep(){
    if(this.ballotStep === 1){
      this.ballotStep++;
      this.BallotAux.exercise_id = this.ejercicioId;
    }else{
      this.saveBallots();
    }
  }


  saveBallots(){

    this.apiBallot.createBallot( this.BallotAux ).subscribe(
      (res) => {
        this.ballotStep = 1;
        this.step = 2;
        this.BallotList.push(this.BallotAux);

         // Eliminar el cargo seleccionado de la lista de cargos
        this.PartiesListAux = [...this.PartiesList];
        const chargeIndex = this.chargeOptionsAux.findIndex(charge => charge.id.toString() === this.BallotAux.charge_id.toString());
        if (chargeIndex !== -1) {
            this.chargeOptionsAux.splice(chargeIndex, 1);
        }

    this.BallotAux = {
      charge_id: 0, 
      exercise_id: "0", 
      candidates :[]
    };



        this.closeModal();
      },
      (err) => {
        this.ballotStep = 1;
        alert('ERROR: ' + err.error.error);
      }
    );

   
  }

  addCandidateToBallot() {
    this.BallotAux.candidates.push(this.CandidateAux);

    // Eliminar el partido seleccionado de la lista de partidos
    const partyIndex = this.PartiesListAux.findIndex(party => party.party_id.toString() === this.CandidateAux.party_id.toString());
    if (partyIndex !== -1) {
        this.PartiesListAux.splice(partyIndex, 1);
    }

    this.CandidateAux = {
        name: "",
        first_lastname: "",
        second_lastname: "",
        pseudonym: "",
        party_id: 0
    };
    this.ballotStep = 2;
}

popCandidate(index: number, candidate: Candidate) {
  this.returnPartyToPartyList(candidate.party_id);
  this.BallotAux.candidates.splice(index, 1);
}

popCharge(index: number, ballot: Ballot ) {
  this.returnChargeToList(ballot.charge_id);
  this.chargeOptionsAux.splice(index, 1);
}

returnChargeToList(charge_id: number) {
  const charge = this.chargeOptions.find(p => p.id.toString() == charge_id.toString());
  if (charge) {
      this.chargeOptionsAux.push(charge);
  }
}

returnPartyToPartyList(partyId: number) {
  const party = this.PartiesList.find(p => p.party_id.toString() == partyId.toString());
  if (party) {
      this.PartiesListAux.push(party);
  }
}




  guardar() {
    this.ejercicioService.createExercise(this.ejercicio).subscribe(
      (response) => {
      this.ejercicioId = response.id;
          this.step = 2;
      },
      (error) => {
        console.error('Error al guardar el ejercicio', error);
        // Puedes manejar el error aquí
      }
    );
  }

  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }
  

}
