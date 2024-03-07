import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
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
export class AreaHomeComponent implements OnInit, OnDestroy{

  // Get data from parent (surface component)
  @Input() system_language : string = '';
  velocityFR: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  velocityFL: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  velocityRR: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  velocityRL: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };

  accelerationFR: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  accelerationFL: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  accelerationRR: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  accelerationRL: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };

  accelerator: DisplayValueModel = {
    value: 0,
    unit: "%"
  };

  brake: DisplayValueModel = {
    value: 0,
    unit: "%"
  };

  steeringAngle: DisplayValueModel = {
    value: 0,
    unit: "°"
  };

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

    this.http.get(ApiPathBase + "pedals/accelerator").subscribe(
      (response: any) => {
        this.accelerator = {
          value: Math.round(response.value),
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "pedals/brake").subscribe(
      (response: any) => {
        this.brake = {
          value: Math.round(response.value),
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "steering_angle/value").subscribe(
      (response: any) => {
        this.steeringAngle = {
          value: Math.round(response.value),
          unit: response.unit
        };
      }
    );
  }

}
