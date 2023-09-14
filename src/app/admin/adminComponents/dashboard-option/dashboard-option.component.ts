import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-option',
  templateUrl: './dashboard-option.component.html',
  styleUrls: ['./dashboard-option.component.less']
})
export class DashboardOptionComponent {
  @Input() name: string = "Nombre";
  @Input() image: string = "image 6.png";
  @Input() Optioncolor: string = "1";

}
