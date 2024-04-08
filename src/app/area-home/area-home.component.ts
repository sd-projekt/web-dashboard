import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {delay, interval, Subscription} from "rxjs";
import {DisplayValueModel} from "../models/display-value.model";
import {WidgetChartLineVelocityComponent} from "../widget-chart-line-velocity/widget-chart-line-velocity.component";
import {
  WidgetChartLineAccelerationComponent
} from "../widget-chart-line-acceleration/widget-chart-line-acceleration.component";
import {
  WidgetChartBarShockAbsorberComponent
} from "../widget-chart-bar-shock-absorber/widget-chart-bar-shock-absorber.component";

import {GaugeComponent, GaugeModule} from "angular-gauge";
import {NgxGaugeModule} from "ngx-gauge";

@Component({
  selector: 'app-area-home',
  standalone: true,
  imports: [
    NgIf,
    WidgetChartLineVelocityComponent,
    WidgetChartLineAccelerationComponent,
    WidgetChartBarShockAbsorberComponent,
    NgxGaugeModule
  ],
  templateUrl: './area-home.component.html',
  styleUrls: [
    './area-home.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaHomeComponent implements OnInit, OnDestroy{

  thresholdConfig_steering_wheel = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
  };


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

  shockAbsorberFR: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  shockAbsorberFL: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  shockAbsorberRR: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  shockAbsorberRL: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };
  statemachineState: DisplayValueModel = {
    value: "Loading",
    unit: ""
  };

  subscriptionTimer : Subscription;
  // Intervall to update the current time, in milliseconds
  timer = 2500;

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

  startTSButton() {
    const ApiPathUpdate = "http://localhost:8000/update_value/"
    const ApiPathBase = "http://localhost:8000/data/"

    const TS_PRECHARGE_DATA = {
      "component": "drivecontroller",
      "parameter": "statemachine_state",
      "newValue": 1
    }
    const TS_READY_DATA = {
      "component": "drivecontroller",
      "parameter": "statemachine_state",
      "newValue": 2
    }
    const TS_ACTIVE_DATA = {
      "component": "drivecontroller",
      "parameter": "statemachine_state",
      "newValue": 3
    }
    //this.http.post(ApiPathUpdate, TS_PRECHARGE_DATA);
    //this.get_statemachine_state()
    //setTimeout(() => {console.log("READY"); this.http.post(ApiPathUpdate, TS_READY_DATA)}, 2000);
    //this.get_statemachine_state()
    //setTimeout(() => {console.log("ACTIVE"); this.http.post(ApiPathUpdate, TS_ACTIVE_DATA)}, 5000);
    //this.get_statemachine_state()
    this.http.post(ApiPathUpdate, TS_ACTIVE_DATA).subscribe((response: any) => {
      console.log(response)
    });
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

    this.http.get(ApiPathBase + "spring_travel/value_fr").subscribe(
      (response: any) => {
        this.shockAbsorberFR = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "spring_travel/value_fl").subscribe(
      (response: any) => {
        this.shockAbsorberFL = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "spring_travel/value_rr").subscribe(
      (response: any) => {
        this.shockAbsorberRR = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "spring_travel/value_rl").subscribe(
      (response: any) => {
        this.shockAbsorberRL = {
          value: response.value,
          unit: response.unit
        };
      }
    );

    this.http.get(ApiPathBase + "drivecontroller/statemachine_state").subscribe(
      (response: any) => {
        var realValue = Math.round(response.value)

        switch (realValue) {
          case 0:
            this.statemachineState.value = "SYSTEM_STOP"
            break;
          case 1:
            this.statemachineState.value = "TS_PRECHARGE"
            break;
          case 2:
            this.statemachineState.value = "TS_READY"
            break;
          case 3:
            this.statemachineState.value = "TS_ACTIVE"
            break;
          default:
            break;
        }
      }
    );
  }

  get_statemachine_state() {
    var ApiPathBase = "http://localhost:8000/data/"

    this.http.get(ApiPathBase + "drivecontroller/statemachine_state").subscribe(
      (response: any) => {
        var realValue = Math.round(response.value)

        switch (realValue) {
          case 0:
            this.statemachineState.value = "SYSTEM_STOP"
            break;
          case 1:
            this.statemachineState.value = "TS_PRECHARGE"
            break;
          case 2:
            this.statemachineState.value = "TS_READY"
            break;
          case 3:
            this.statemachineState.value = "TS_ACTIVE"
            break;
          default:
            break;
        }
      }
    );
  }

}
