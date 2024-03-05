import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-area-controller',
  standalone: true,
  imports: [],
  templateUrl: './area-controller.component.html',
  styleUrls: [
    './area-controller.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaControllerComponent {
  @Input() system_language : string = '';

}
