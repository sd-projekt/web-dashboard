import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {interval, Subscription} from "rxjs";
import {DisplayValueModel} from "../models/display-value.model";


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
export class AreaHomeComponent implements OnInit{

  // Get data from parent (surface component)
  @Input() system_language : string = '';
  velocityFR: DisplayValueModel;
  velocityFL: DisplayValueModel;
  velocityRR: DisplayValueModel;
  velocityRL: DisplayValueModel;

  accelerationFR: DisplayValueModel;
  accelerationFL: DisplayValueModel;
  accelerationRR: DisplayValueModel;
  accelerationRL: DisplayValueModel;

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


  update_values() {
    var ApiPathBase = "http://localhost:8000/data/"

    // Velocities
    this.http.get(ApiPathBase + "velocity/value_fr").subscribe(
      (response: any) => {
        this.velocityFR = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "velocity/value_fl").subscribe(
      (response: any) => {
        this.velocityFL = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "velocity/value_rr").subscribe(
      (response: any) => {
        this.velocityRR = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "velocity/value_rl").subscribe(
      (response: any) => {
        this.velocityRL = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "acceleration/value_fr").subscribe(
      (response: any) => {
        this.accelerationFR = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "acceleration/value_fl").subscribe(
      (response: any) => {
        this.accelerationFL = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "acceleration/value_rr").subscribe(
      (response: any) => {
        this.accelerationRR = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "acceleration/value_rl").subscribe(
      (response: any) => {
        this.accelerationRL = {
          value: response.value,
          unit: response.unit
        };
      }
    );
  }

}
