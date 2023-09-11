import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.less']
})
export class BotonComponent {
  @Input() texto: string = 'Enter your text';
}
