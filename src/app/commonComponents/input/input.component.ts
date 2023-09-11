import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent {
  @Input() inputType: string = 'text'; // Default to text type
  @Input() label: string = 'text'; // Default to text type
  @Input() placeholder: string = 'Enter your text';

}
