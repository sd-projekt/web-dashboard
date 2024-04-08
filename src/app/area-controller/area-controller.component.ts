import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient} from '@angular/common/http';
import {interval, Subscription} from "rxjs";
import {DisplayValueModel} from "../models/display-value.model";

@Component({
  selector: 'app-area-controller',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './area-controller.component.html',
  styleUrls: [
    './area-controller.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaControllerComponent implements OnInit, OnDestroy{
  @Input() system_language : string = '';

  errorState: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }

  controlState: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }

  subscriptionTimer : Subscription;
  // Intervall to update the current time, in milliseconds
  timer = 1000;

  constructor(private http: HttpClient) {
    // Timer to update the current time in a regular interval, defined by the timer variable
    this.subscriptionTimer = interval(this.timer).subscribe(x =>{this.update_values()});
  }

  ngOnInit() {
    this.update_values();
  }

  ngOnDestroy() {
    this.subscriptionTimer.unsubscribe();
  }

  update_values() {
    var ApiPathBase = "http://localhost:8000/data/"

    this.http.get(ApiPathBase + "c6/control_state").subscribe(
      (response: any) => {
        this.controlState.value = Math.round(response.value)
      }
    );

    this.http.get(ApiPathBase + "c6/error_state").subscribe(
      (response: any) => {
        this.errorState.value = Math.round(response.value)
      }
    );
  }
}
