import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-area-home',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './area-home.component.html',
  styleUrls: [
    './area-home.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaHomeComponent{

  // Get data from parent (surface component)
  @Input() system_language : string = '';
}
