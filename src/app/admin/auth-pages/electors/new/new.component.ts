import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ElectorService } from 'src/app/services/electors/electors.service';
import { FileService } from 'src/app/services/file/file.service';
import { RealTimeService } from 'src/app/services/realTime/real-time.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent implements OnInit {
  stateList: any = [];
  nombre: string = '';
  apepat: string = '';
  apemat: string = '';
  fecha: string = '';
  sexo: string = '';
  calle: string = '';
  colonia: string = '';
  nExterior: number | undefined;
  nInterior: number | undefined;
  cPostal: number | undefined;
  estado: string = '';
  email: string = '';

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';
  showModal = false;

  constructor(
    private apiState: RealTimeService,
    private apiElector: ElectorService,
    private apiFile: FileService,
    private router: Router
  ) {
    this.getStates();
  }

  ngOnInit() {}

  getStates() {
    this.apiState.getAllStates().subscribe(
      (res) => {
        this.stateList = res;
      },
      (err) => {
        alert('ERROR: ' + err.error.error);
      }
    );
  }

  areAllFieldsComplete(): boolean {
    return (
      this.nombre !== '' &&
      this.apepat !== '' &&
      this.apemat !== '' &&
      this.fecha !== '' &&
      this.sexo !== '' &&
      this.calle !== '' &&
      this.colonia !== '' &&
      this.nExterior !== undefined &&
      this.nInterior !== undefined &&
      this.cPostal !== undefined &&
      this.estado !== '' &&
      this.email !== ''
    
    );
  }

  saveElector() {
    if (this.webcamImage) {
      const blob = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);
      const file = new File([blob], 'webcam-image.png', { type: 'image/png' });

      this.apiFile.uploadFile(file).subscribe(
        (response) => {
          const imageUrl = response.fullPath;
          const electorData = {
            name:  this.nombre,
            first_lastname:  this.apepat,
            second_lastname: this.apemat,
            date_of_birth: this.fecha,
            street: this.calle,
            outer_number: this.nExterior,
            interior_number: this.nInterior,
            zip_code: this.cPostal,
            state_id: this.estado,
            picture: imageUrl,
            gender: this.sexo,
            email: this.email
          }
          ;
          
          this.apiElector.createElector(electorData).subscribe(
            (res) => {
              this.router.navigate(['/admin/auth/electors']);
            },
            (err) => {
              alert(err.error);
            }

          );
        },
        (error) => {
          console.error('Error al subir la imagen', error);
        }
      );
    } else {
      console.warn('Debe seleccionar un archivo de imagen');
    }
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  getSnapshot(): void {
    this.trigger.next(void 0);
    this.closeModal();
  }

  captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }

  get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
