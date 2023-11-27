import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as faceapi from 'face-api.js';
import { Imagenes } from '../interfaces/images-interface';
import { ProcessFaceService } from '../services/process-face.service';
import { StepsService } from '../steps.service';
import { UserDataService } from '../user-data.service';
import { AccesService } from '../services/acces.service';
import { VoteService } from 'src/app/services/vote/vote.service';

@Component({
  selector: 'app-scan-face',
  templateUrl: './scan-face.component.html',
  styleUrls: ['./scan-face.component.less']
})
export class ScanFaceComponent implements OnInit, OnDestroy {
  @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;
  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;

  imagenes: any = [];
  mediaStream: MediaStream | null = null;
  private detectionInterval: any;

  public context!: CanvasRenderingContext2D;

  constructor(private http: HttpClient, private processFaceSyn: ProcessFaceService, public stepService: StepsService, private userService: UserDataService, public accesService: AccesService,
    private apiVote: VoteService) { }

  ngOnInit(): void {
    this.main();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
    }
  }

  main = async () => {
    if (this.stepService.currentStep !== 3) {
      return;
    }
    this.context = this.myCanvas.nativeElement.getContext("2d");
    this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    await faceapi.nets.tinyFaceDetector.loadFromUri("/assets/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/assets/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/assets/models");

    this.imagesLista();


    this.videoContainer.nativeElement.srcObject = this.mediaStream;
    const reDrawc = async () => {
      this.context.canvas.width = this.videoContainer.nativeElement.videoWidth;
      this.context.canvas.height = this.videoContainer.nativeElement.videoHeight;

      this.context.drawImage(this.videoContainer.nativeElement, 0, 0, this.context.canvas.width, this.context.canvas.height);
      requestAnimationFrame(reDrawc);
    }
    const processFace = async () => {
      const detection = await faceapi.detectSingleFace(this.myCanvas.nativeElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (typeof detection === 'undefined') {
        this.accesService.estado = "No se detecta ningun rostro";
        //console.log('Sin rostro detectado');
        return;
      }
      this.processFaceSyn.descriptor(detection);
    }
    this.detectionInterval = setInterval(processFace, 2000);
    requestAnimationFrame(reDrawc);
  }

  imagesLista() {
    this.apiVote.getElectorImage(this.userService.getId()).subscribe(
      (res) =>{
        const imageElement = document.createElement("img");
        imageElement.src = res.picture;
        imageElement.crossOrigin = 'anonymous';
        this.processFaceSyn.processFace(imageElement, this.userService.getId());
      },
      (err) => {

      }
    );
  }


}
