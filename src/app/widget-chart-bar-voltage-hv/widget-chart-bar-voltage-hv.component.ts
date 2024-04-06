import {Component} from '@angular/core';
import {AgChartsAngular} from 'ag-charts-angular';
import {AgChartOptions} from 'ag-charts-community';
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-widget-chart-bar-voltage-hv',
  standalone: true,
  imports: [AgChartsAngular, NgIf],
  // ag-charts-angular component with chartOptions attribute
  template:
    `<ag-charts-angular
      *ngIf="chartOptions"
        style="height: 100%;"
        [options]="chartOptions">
   </ag-charts-angular>`
})
export class WidgetChartBarVoltageHvComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor(private http: HttpClient) {
    this.getData().subscribe(data => {
      this.chartOptions = {
        // Data: Data to be displayed in the chart
        data: data,
        // Series: Defines which chart type and data to use
        animation: {enabled: true},
        series: [
          { type: 'bar', xKey: 'time', yKey: 'voltage', yName: 'Spannung'}
        ],
        background: {
          fill: "transparent",
        },
        axes: [
          {
            type: "category",
            position: "bottom",
            label: { color: "transparent"},
            line: {
              enabled: false,
            },
          },
          {
            type: "number",
            position: "left",
            label: {
              color: "white",
            },
            min: 0,
            max: 600,
            gridLine: {
              enabled: false,
            },
            line: {
              enabled: false,
            },
            crossLines: [
              {
                type: "line",
                value: 400.0,
                stroke: "red",
              }
            ]
          },
        ],
        legend: {
          position: "bottom",
          item: {
            label : {
              color: "white"
            }
          }
        },
      };
    })
    this.startUpdates()
  }

  getData() {
    const voltageDataURL = "http://localhost:8000/data/accumulator/voltage_hv";

    return this.http.get<any>(voltageDataURL).pipe(
      map((response) => {
        return [{
          time: response.timestamp,
          voltage: response.value
        }];
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  update = () => {
    const options = { ...this.chartOptions };

    this.getData().subscribe(data => {
      options.data = data;
    })

    this.chartOptions = options;
  }

  public updating = false;
  startUpdates = () => {
    if (this.updating) {
      return;
    }
    this.updating = true;
    //@ts-ignore
    this.update();
    //@ts-ignore
    setInterval(this.update, 1000);
  };
}

