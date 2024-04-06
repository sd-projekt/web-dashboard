import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient} from '@angular/common/http';
import {interval, Subscription} from "rxjs";
import {DisplayValueModel} from "../models/display-value.model";
import {WidgetChartScatterTemperatureComponent} from "../widget-chart-scatter-temperature/widget-chart-scatter-temperature.component";
import {NgxGaugeModule} from "ngx-gauge";

@Component({
  selector: 'app-area-motor',
  standalone: true,
  imports: [
    NgIf, WidgetChartScatterTemperatureComponent, NgxGaugeModule
  ],
  templateUrl: './area-motor.component.html',
  styleUrls: [
    './area-motor.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaMotorComponent implements OnInit, OnDestroy{
  @Input() system_language : string = '';

  thresholdConfig_temperature = {
    '0': {color: 'green'},
    '2500': {color: 'orange'},
    '4000': {color: 'red'}
  };

  // Display values (init value is always loading
  temperatureRight: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }
  temperatureLeft: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }
  rpmRight: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }
  rpmLeft: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }
  inverterTemperature: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }
  errorState: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }
  targetTorque: DisplayValueModel = {
    value: "Loading",
    unit: ""
  }
  dcLinkVoltage: DisplayValueModel = {
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

    // Temperatures
    this.http.get(ApiPathBase + "motor/temperature_right").subscribe(
      (response: any) => {
        this.temperatureRight = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "motor/temperature_left").subscribe(
      (response: any) => {
        this.temperatureLeft = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "motor/rpm_right").subscribe(
      (response: any) => {
        this.rpmRight = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "motor/rpm_left").subscribe(
      (response: any) => {
        this.rpmLeft = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "inverter/temperature").subscribe(
      (response: any) => {
        this.inverterTemperature = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "inverter/error_state").subscribe(
      (response: any) => {
        this.errorState.value = Math.round(response.value)
      }
    );

    this.http.get(ApiPathBase + "inverter/target_torque").subscribe(
      (response: any) => {
        this.targetTorque = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "inverter/v_zk").subscribe(
      (response: any) => {
        this.dcLinkVoltage = {
          value: response.value,
          unit: response.unit
        };
      }
    );
  }
}
