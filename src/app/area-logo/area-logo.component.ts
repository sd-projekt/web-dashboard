import {Component, Input, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {RenderModelComponent} from "../render-model/render-model.component";
import {formatDate, NgIf} from "@angular/common";

@Component({
  selector: 'app-area-logo',
  standalone: true,
  imports: [
    RenderModelComponent,
    NgIf
  ],
  templateUrl: './area-logo.component.html',
  styleUrls: [
    './area-logo.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaLogoComponent implements OnInit{

  @Input() system_language : string = '';

  // Used to identify the current time
  time : String = '';
  now: number;

  subscriptionTimer : Subscription;
  // Intervall to update the current time, in milliseconds
  timer = 1000;

  ngOnInit() {
    // Load current time, geolocation and ip by startup once
    this.updateTime();
  }

  constructor() {
    // Timer to update the current time in a regular interval, defined by the timer variable
    this.subscriptionTimer = interval(this.timer).subscribe(x =>{this.updateTime()});
  }

  // Update the current time
  updateTime()
  {
    this.now = Date.now();
    this.time = formatDate(this.now, 'dd.MM.yyyy HH:mm:ss', 'en-US', 'GMT+2');
  }
}
