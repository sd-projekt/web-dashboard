import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {interval, Subscription} from "rxjs";
import {DisplayValueModel} from "../models/display-value.model";
import {WidgetChartBarVoltageHvComponent} from "../widget-chart-bar-voltage-hv/widget-chart-bar-voltage-hv.component";

@Component({
  selector: 'app-area-battery',
  standalone: true,
  imports: [HttpClientModule, NgIf, WidgetChartBarVoltageHvComponent],
  templateUrl: './area-battery.component.html',
  styleUrls: [
    './area-battery.component.css',
    '../surface/surface.component.css'
  ]})
export class AreaBatteryComponent implements OnInit, OnDestroy{
  @Input() system_language : string = '';

  voltageHV: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  currentHV: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  voltageLV: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  lowestCellVoltage: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  contactorState: string = "Closed";

  subscriptionTimer: Subscription;
  // Subscription interval
  timer: number = 1000;

  constructor(private http: HttpClient) {
    // Regularly update values using http requests
    this.subscriptionTimer = interval(this.timer).subscribe(x => {this.update_values()});
  }

  ngOnInit() {
    this.update_values()
  }

  ngOnDestroy() {
    this.subscriptionTimer.unsubscribe();
  }

  update_values() {
    var batteryApiPathBase = "http://localhost:8000/data/accumulator/";

    this.http.get(batteryApiPathBase + "voltage_hv").subscribe(
      (response: any) => {
        this.voltageHV = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(batteryApiPathBase + "current_hv").subscribe(
      (response: any) => {
        this.currentHV = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(batteryApiPathBase + "voltage_lv").subscribe(
      (response: any) => {
        this.voltageLV = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(batteryApiPathBase + "lowest_cell_voltage").subscribe(
      (response: any) => {
        this.lowestCellVoltage = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(batteryApiPathBase + "contactor_state").subscribe(
      (response: any) => {
        if (response.value == 0) {
          this.contactorState = "Closed";
        } else {
          this.contactorState = "Open";
        }
      }
    );
  }
}
