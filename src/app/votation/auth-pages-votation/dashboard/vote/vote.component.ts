import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.less']
})
export class VoteComponent {
  @ViewChild('cameraFeed') cameraFeed!: ElementRef;
  private mediaStream: MediaStream | null = null;

  constructor() {
    this.cameraFeed = {} as ElementRef;
  }
  nombre = "Jaime";
  estado = "Aguascalientes";

  seconds = 0;
  step: number = 3;

  opciones: Array<any> = [];
  opcionesTotales = 0;
  opcionesTotalesArray: number[] = [];

  stepB = 1;
  tipo = "GOBERNATURA";

  up() {
    this.step++;
    if (this.step == 2 || this.step == 3) {
      this.startCamera();
    } else if (this.step == 4) {
      //Obtencion de los datos
      this.opcDisp();
      this.cargarOpciones();
    } else if (this.step > 5 || this.step < 0) {
      this.step = 1;
    }
  }

  startCamera() {
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.mediaStream = stream;
        this.cameraFeed.nativeElement.srcObject = stream;
      });
  }

  stopCamera() {
    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach(track => track.stop());
      this.cameraFeed.nativeElement.srcObject = null;
    }
  }

  scanQR() {
    var vote = true;
    if (vote) {
      this.stopCamera();
      this.up();
    } else {
      this.stopCamera();
      this.step = 0;
      this.count();
    }
  }

  count() {
    this.seconds = 10;
    const intervalId = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        clearInterval(intervalId);
        this.up();
      }
    }, 1000);
  }

  scanFace() {
    var vote = true;
    if (vote) {
      this.stopCamera();
      this.up();
    } else {
      this.stopCamera();
      this.step = 0;
      this.count();
    }
  }

  cargarOpciones() {
    const indicadorElement = document.getElementById("bolitas");
    if (this.stepB == 1) {
      this.opciones = [
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 1',
          partido: 'Partido A',
          coalicion: 'Coalición X',
        },
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 2',
          partido: 'Partido B',
          coalicion: 'Coalición Y',
        },
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 3',
          partido: 'Partido C',
          coalicion: 'Coalición Z',
        },
      ];
    } else if (this.stepB == 2) {
      this.opciones = [
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 4',
          partido: 'Partido A',
          coalicion: 'Coalición 1',
        },
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 5',
          partido: 'Partido B',
          coalicion: 'Coalición 2',
        },
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 6',
          partido: 'Partido C',
          coalicion: 'Coalición 3',
        },
      ];
    } else if (this.stepB == 3) {
      this.opciones = [
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 7',
          partido: 'Partido X',
          coalicion: 'Coalición A',
        },
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 8',
          partido: 'Partido Y',
          coalicion: 'Coalición B',
        },
        {
          imageUrl: '../../../../../assets/Images/Logo_Instituto_Nacional_Electoral.svg.svg',
          nombre: 'Candidato 9',
          partido: 'Partido Z',
          coalicion: 'Coalición C',
        }
      ];
    }
  }

  opcDisp() {
    this.opcionesTotales = 3;
  }

  changeOpc() {
    this.stepB++;
    this.cargarOpciones();
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

}
