import { Component, ElementRef, ViewChild } from '@angular/core';
import { StepsService } from './steps.service';
import { UserDataService } from './user-data.service';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.less']
})
export class VoteComponent {
  @ViewChild('cameraFeed') cameraFeed!: ElementRef;

  private mediaStream: MediaStream | null = null;

  dataBoleta: Array<any> = [];
  opciones: Array<any> = [];
  opcionesTotales = 0;
  opcionesTotalesArray: number[] = [];

  votos: Array<any> = [];
  selectedOption: number = 0;

  envioVotos: Array<any> = [];
  resultados: Array<any> = [];

  stepB = 1;

  constructor(
    public stepService: StepsService,
    public userData: UserDataService,
    private http: HttpClient
  ) {
    this.stepService.currentStep$.subscribe((step) => {
      //console.log(`Step=  ${step}`);
      if (step == 4) {
        this.cargarOpciones();
      }
    });
  }

  up() {
    this.stepService.up();
    if (this.stepService.currentStep > 5 || this.stepService.currentStep < 0) {
      this.stepService.change(1);
    }
  }

  cargarOpciones() {
    this.http.get<any>(`${URL}/boleta`).subscribe((data) => {
      this.dataBoleta = data;
      this.opcionesTotales = this.dataBoleta.length;
      this.opciones = this.dataBoleta[this.stepB - 1].candidates;
      this.selectedOption = 0;
    });
  }


  selectOption(option: any) {
    if (this.selectedOption == option) {
      this.selectedOption = 0;
    } else {
      this.selectedOption = option;
    }
  }

  isOptionSelected(option: any): boolean {
    return this.selectedOption === option;
  }

  changeOpc() {
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
      if (this.votos[i].id > 0) {
        const estructure = {
          ballot_id: this.dataBoleta[i].ballot_id,
          candidate_id: this.votos[i].id,
          isSpoiledVote: false,
        };
        this.resultados.push(`${this.votos[i].name} ${this.votos[i].first_lastname} ${this.votos[i].second_lastname}`);
        this.envioVotos.push(estructure);
      } else {
        const estructure = {
          ballot_id: this.dataBoleta[i].ballot_id,
          candidate_id: 0,
          isSpoiledVote: true,
        };
        this.resultados.push('Voto omitido');
        this.envioVotos.push(estructure);
      }
    }

    //Mandamos el array envioVotos
    const jsonEnvioVotos = {
      votes: this.envioVotos,
    };
    const jsonString = JSON.stringify(jsonEnvioVotos);
    console.log(jsonString);

    const body = { id: this.userData.getId(), voto: 1 };

    this.http.post(`${URL}/actualizar`, body).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
      }
    );
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
