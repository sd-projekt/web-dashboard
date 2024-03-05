import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {interval, Subscription} from "rxjs";


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

  subscriptionTimer : Subscription;
  // Intervall to update the current time, in milliseconds
  timer = 60000;

  constructor(private http: HttpClient) {
    // Timer to update the current time in a regular interval, defined by the timer variable
    this.subscriptionTimer = interval(this.timer).subscribe(x =>{this.updateTime()});
  }


}
