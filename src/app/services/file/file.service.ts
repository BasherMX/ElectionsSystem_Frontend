import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.dev';
import { Endpoints } from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = environment.apiUrl;
  private endpoints = Endpoints.file;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const url = this.apiUrl + this.endpoints.upload;
    return this.http.post(url, formData, { headers: this.getHeaders() });
  }
}



/* 

// PARA SUBIR FOTO AL SERVIDOR
// npm install ngx-webcam


import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(private fileService: FileService) {}

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public uploadFile(): void {
    if (this.webcamImage) {
      const file = this.dataURLtoFile(this.webcamImage.imageAsDataUrl, 'photo.png');
      this.fileService.uploadFile(file).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito.
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Manejo de errores, por ejemplo, mostrar un mensaje de error.
        }
      );
    }
  }

  public fileInputChange(files: FileList): void {
    const file = files.item(0);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.webcamImage = {
          imageAsBase64: reader.result.toString(),
          imageAsDataUrl: reader.result.toString(),
        };
      };
    }
  }

  private dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}




<!-- upload-photo.component.html -->

<div>
  <webcam
    [height]="480"
    [width]="640"
    [trigger]="triggerObservable"
    (imageCapture)="handleImage($event)"
    (cameraSwitched)="onCameraSwitch($event)"
    [allowCameraSwitch]="true"
  ></webcam>

  <button (click)="triggerSnapshot()">Take a Photo</button>
  <input #fileInput type="file" (change)="fileInputChange($event.target.files)" accept="image/*">

  <button (click)="uploadFile()">Upload Photo</button>
</div>





*/