import { Component, ElementRef, ViewChild } from '@angular/core';
import { StepsService } from './steps.service';
import { UserDataService } from './user-data.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.less'],
})
export class VoteComponent {
  @ViewChild('cameraFeed') cameraFeed!: ElementRef;

  private mediaStream: MediaStream | null = null;

  dataBoleta: Array<any> = [];
  opciones: Array<any> = [];
  opcionesTotales = 0;
  opcionesTotalesArray: number[] = [];
  hasSelectedOption: boolean = false;


  votos: Array<any> = [];
  selectedOption: number = 0;

  envioVotos: Array<any> = [];
  excersiceID: string = '';
  resultados: Array<any> = [];

  stepB = 1;

  constructor(
    public stepService: StepsService,
    public userData: UserDataService,
    private apiVote: VoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.excersiceID = params['ExerciseId'];
    });
    this.stepService.currentStep$.subscribe((step) => {
      //console.log(`Step=  ${step}`);
      if (step == 4) {
        this.cargarOpciones();
      }
      if (step == 6) {
        this.clearAll();
      }
      // this.stepService.change(0);
    });
  }

  clearAll(){
    console.log("si borre");
      this.dataBoleta = [];
      this.opciones = [];
      this.opcionesTotales = 0;
      this.opcionesTotalesArray = [];
      this.votos = [];
      this.selectedOption = 0;
      this.envioVotos = [];
      this.resultados = [];
      this.stepB = 1;
      this.hasSelectedOption = false;


      console.log(this.dataBoleta,
        this.opciones,
        this.opcionesTotales,
        this.opcionesTotalesArray,
        this.votos,
        this.selectedOption,
        this.envioVotos,
        this.excersiceID,
        this.resultados,
        this.stepB = 1)
  }

  up() {
    this.stepService.up();
    if (this.stepService.currentStep == 6) {
      this.stepService.change(1);
      this.clearAll();
    }
  }

  cargarOpciones() {
    this.apiVote.getBallotsByExerciseId(this.excersiceID).subscribe(
      (res) => {
        this.dataBoleta = res;
        this.opcionesTotales = this.dataBoleta.length;
        this.opciones = this.dataBoleta[this.stepB - 1].candidates;
        this.selectedOption = 0;
      },
      (err) => {}
    );
  }

  selectOption(option: any) {
    if (this.selectedOption === option) {
      this.selectedOption = 0;
      this.hasSelectedOption = false;
    } else {
      this.selectedOption = option;
      this.hasSelectedOption = true;
    }
  }
  

  isOptionSelected(option: any): boolean {
    return this.selectedOption === option;
  }

  changeOpc() {
    this.hasSelectedOption = false;
    this.votos.push(this.selectedOption);
    if (this.stepB >= this.opcionesTotales) {
      this.enviarVotos();
      this.up();
      return;
      //console.log(this.votos);
    } else {
      this.stepB++;
    }
    this.cargarOpciones();
  }

  enviarVotos() {
    for (let i = 0; i < this.votos.length; i++) {
      let spoiled = false;
      if (this.votos[i].candidate_id == 0) {
        spoiled = true;
      }

      const estructure = {
        ballot_id: this.dataBoleta[i].ballot_id,
        candidate_id: this.votos[i].candidate_id,
        isSpoiledVote: spoiled,
      };

      this.resultados.push(
        `${this.votos[i].name} ${this.votos[i].first_lastname} ${this.votos[i].second_lastname}`
      );
      this.envioVotos.push(estructure);
    }
    const jsonEnvioVotos = {
      elector_id: this.userData.getId(),
      exercise_id: this.excersiceID,
      votes: this.envioVotos,
    };

    this.apiVote.voteForCandidate(jsonEnvioVotos).subscribe(
      (res) => {
        // this.router.navigate(['/votation/dashboard/vote/'+this.excersiceID]);
        // console.log(res); // Agrega este console.log
      },
      (err) => {
        // this.router.navigate(['/votation/dashboard/vote/'+this.excersiceID]);
        // alert('error aa' + err.error.error);
      }
    );
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
