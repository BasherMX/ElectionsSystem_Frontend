import { Component, ChangeDetectorRef } from '@angular/core';
import { FileService } from 'src/app/services/file/file.service';
import { PoliticalPartyService } from 'src/app/services/politicalParty/political-party.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.less']
})
export class NewComponent {
  nombre: string = '';
  acronimo: string = '';
  fechaFundacion: string = '';
  color: string = '#000000';
  logoFile: File | null = null;
  logoUrl: string | ArrayBuffer | null = null;

  constructor(
    private fileService: FileService,
    private politicalPartyService: PoliticalPartyService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  registrarPartido(): void {

    // Validar que todos los campos obligatorios estén llenos
  if (!this.nombre || !this.acronimo || !this.fechaFundacion || !this.color) {
    alert('Todos los campos son obligatorios');
    return;
  }

    if (this.logoFile) {
      this.fileService.uploadFile(this.logoFile).subscribe(response => {
        const imageUrl = response.fullPath;

        // Ahora, puedes llamar a la función para registrar el partido político
        this.registrarPartidoConImagen(imageUrl);
      }, error => {
        console.error('Error al subir la imagen', error);
      });
    } else {
      console.warn('Debe seleccionar un archivo de imagen');
    }
  }

  // Función para registrar el partido político con la URL de la imagen
  private registrarPartidoConImagen(imageUrl: string): void {
    let data = {
      name: this.nombre,
      acronym: this.acronimo,
      foundation: this.fechaFundacion,
      img_logo: imageUrl,
      color_hdx:this.color
    };

    this.politicalPartyService.createParty(data).subscribe(result => {
      this.router.navigate(['/admin/auth/partyes']);
    }, error => {
      alert(error.error);
    });
  }

  onLogoChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
        this.logoFile = files[0];
        this.getLogoUrl(); // Llama a esta función para actualizar la URL de la imagen
    } else {
        this.logoFile = null;
        this.logoUrl = null;
    }
}

getLogoUrl(): void {
    if (this.logoFile) {
        const reader = new FileReader();
        reader.onload = () => {
            this.logoUrl = reader.result;
            this.changeDetectorRef.detectChanges(); // Forzar la actualización del ciclo de detección de cambios
        };
        reader.readAsDataURL(this.logoFile);
    }
}

}
