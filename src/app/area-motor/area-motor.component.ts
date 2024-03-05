import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-area-motor',
  standalone: true,
  imports: [],
  templateUrl: './area-motor.component.html',
  styleUrls: [
    './area-motor.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaMotorComponent {
  @Input() system_language : string = '';

}
