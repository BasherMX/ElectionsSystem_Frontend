// scan-qr.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StepsService } from '../steps.service';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../user-data.service';
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

  constructor(public stepService: StepsService, private http: HttpClient, private userService: UserDataService) { }

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
    }, 200);
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
      //console.log('El contenido del código QR no es un JSON válido.');
      return;
    }

    try {
      const qrDataObject = JSON.parse(qrCodeData);
      if (!qrDataObject.elector_id) {
        this.scannerStatus = "Código QR no valido";
        //console.log('El campo "elector_id" no está presente en el JSON.');
        return;
      }

      const electorId = qrDataObject.elector_id;
      //console.log(electorId);

      this.http.get<any>(`${URL}/usuarios/${electorId}`).subscribe(
        user => {
          //console.log(user);
          if (user.length > 0) {
            const userData = user[0];
            if (userData.voto == 1) {
              this.stepService.change(0);
            } else if (userData.voto == 0) {
              //console.log('Datos del usuario:', user);
              this.userService.setId(userData.id);
              //console.log(userData.id);
              this.userService.setName(userData.nombre);
              //console.log(userData.nombre);
              this.userService.setEstado(userData.estado);
              //console.log(userData.estado);
              this.stepService.up();
            }
          } else {
            this.scannerStatus = "Código QR no valido";
            //console.log('Usuario no encontrado en la base de datos.');
          }
        },
        error => {
          //console.error('Error al obtener datos del usuario:', error);
        }
      );
    } catch (error) {
      //console.error('Error al analizar los datos del código QR:', error);
    }
  }


}
