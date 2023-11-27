// scan-qr.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StepsService } from '../steps.service';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../user-data.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import { ActivatedRoute } from '@angular/router';
const jsQR = require("jsqr");

const URL = 'http://localhost:3000';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.less']
})
export class ScanQRComponent implements OnInit {


  scannerStatus = "Código QR no detectado";

  @ViewChild('video', { static: true }) videoElement!: ElementRef;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  video: any;
  canvasElement: any;
  canvasContext: any;
  mediaStream: MediaStream | null = null;
  excersiceID: string = "";
  isScanning: boolean = false;

  constructor(public stepService: StepsService, private http: HttpClient, private userService: UserDataService,
    private apiElector: VoteService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.excersiceID = params['ExerciseId'];
      });

  }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.startCamera();
  }

  startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.mediaStream = stream;
          this.video.srcObject = stream;
          this.video.play();
          this.scan();
        })
        .catch(error => console.error('Error accessing camera:', error));
    }
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  scan() {
    if (this.stepService.currentStep !== 2) {
      return;
    }

    if(this.isScanning){
      return;
    }

    setTimeout(() => {
      this.canvasElement.width = this.video.videoWidth;
      this.canvasElement.height = this.video.videoHeight;

      this.canvasContext.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);

      const qrCodeData = this.decodeQRCode(imageData);
      if (qrCodeData != '') {
        //console.log('QR Code Data:', qrCodeData);
        this.verifyUser(qrCodeData);
      } else {
        this.scannerStatus = "Código QR no detectado";
      }
      this.scan();
    }, 800);
  }

  

  decodeQRCode(imageData: ImageData): string {
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      return code.data;
    } else {
      return '';
    }
  }

  verifyUser(qrCodeData: string) {
    if (!qrCodeData.startsWith('{')) {
      this.scannerStatus = "Código QR no valido";
      // alert('El contenido del código QR no es un JSON válido.');
      return;
    }

    try {
      const qrDataObject = JSON.parse(qrCodeData);
      if (!qrDataObject.elector_id) {
        this.scannerStatus = "Código QR no valido";
        // alert('El campo "elector_id" no está presente en el JSON.');
        return;
      }
      // Antes de hacer la solicitud al backend, establece la bandera en true
      this.scannerStatus = "Revisando elector";
      this.isScanning = true;

      const electorId = qrDataObject.elector_id;
      
      const data = {
        elector_id: electorId, 
        exercise_id: this.excersiceID
      }


      this.apiElector.verifyCanVote(data).subscribe(
        (res) => {
          setTimeout(() => {
            console.log(res);
            this.isScanning = false; // Reinicia la bandera después de recibir la respuesta del backend
           
            if (res.code == 1) { //puede votar

              this.userService.setId(electorId);
              this.userService.setName(res.nombre);
              this.userService.setEstado(res.estado);
              this.stepService.up();
            }
          }, 2000);
        },
        (err) =>{
          console.log(err);
          this.isScanning = false; // Reinicia la bandera después de recibir la respuesta del backend
          this.scannerStatus = "Código QR no valido";
          // alert("ERROR EN EL SERVIDOR " + err.error.message);
          if (err.error.code == 3) {//estado no coincide
            this.stepService.change(8);
          
          } else if (err.error.code == 2) {// ya ha votado
            this.stepService.change(0);
          
        }
      }
      );

    } catch (error) {
      console.error('Error al analizar los datos del código QR:', error);
    }
  }


}
