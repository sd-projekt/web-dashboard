import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-area-battery',
  standalone: true,
  imports: [],
  templateUrl: './area-battery.component.html',
  styleUrls: [
    './area-battery.component.css',
    '../surface/surface.component.css'
  ]})
export class AreaBatteryComponent {
  @Input() system_language : string = '';


}
