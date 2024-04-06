import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {min} from "rxjs";

@Component({
  selector: 'app-widget-chart-scatter-temperature',
  standalone: true,
  imports: [AgChartsAngular],
  // ag-charts-angular component with chartOptions attribute
  template:
    `<ag-charts-angular
    style="height: 100%;"
    [options]="chartOptions">
   </ag-charts-angular>`
})
export class WidgetChartScatterTemperatureComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { time: '14:30:00', temperature_l: 26, temperature_r: 2.0},
        { time: '14:30:01', temperature_l: 17, temperature_r: 2.4},
        { time: '14:30:02', temperature_l: 40, temperature_r: -2.2},
        { time: '14:30:03', temperature_l: 5.0, temperature_r: 6.8},
        { time: '14:30:04', temperature_l: 13.2, temperature_r: 13.4},
        { time: '14:30:05', temperature_l: 19.4, temperature_r: 24.0},
        { time: '14:30:06', temperature_l: 26, temperature_r: 2.0},
        { time: '14:30:07', temperature_l: 17, temperature_r: 2.4},
        { time: '14:30:08', temperature_l: 40, temperature_r: -2.2},
        { time: '14:30:09', temperature_l: 5.0, temperature_r: 6.8},
        { time: '14:30:10', temperature_l: 13.2, temperature_r: 13.4},
        { time: '14:30:11', temperature_l: 19.4, temperature_r: 24.0},
        { time: '14:30:12', temperature_l: 26, temperature_r: 2.0},
        { time: '14:30:13', temperature_l: 17, temperature_r: 2.4},
        { time: '14:30:14', temperature_l: 40, temperature_r: -2.2},
        { time: '14:30:15', temperature_l: 5.0, temperature_r: 6.8},
        { time: '14:30:16', temperature_l: 13.2, temperature_r: 13.4},
        { time: '14:30:17', temperature_l: 19.4, temperature_r: 24.0},
        { time: '14:30:18', temperature_l: 26, temperature_r: 2.0},
        { time: '14:30:19', temperature_l: 17, temperature_r: 2.4},
        { time: '14:30:20', temperature_l: 40, temperature_r: -2.2},
        { time: '14:30:21', temperature_l: 5.0, temperature_r: 6.8},
        { time: '14:30:22', temperature_l: 13.2, temperature_r: 13.4},
        { time: '14:30:23', temperature_l: 19.4, temperature_r: 24.0},
        { time: '14:30:24', temperature_l: 13.2, temperature_r: 13.4},
        { time: '14:30:25', temperature_l: 19.4, temperature_r: 24.0},
      ],
      // Series: Defines which chart type and data to use
      series: [
        { type: 'scatter', xKey: 'time', yKey: 'temperature_l', yName: 'Links'},
        { type: 'scatter', xKey: 'time', yKey: 'temperature_r', yName: 'Rechts'},
      ],
      background: {
        fill: "transparent",
      },
      axes: [
        {
          type: "category",
          position: "bottom",
          label: { color: "white"},
          line: {
            enabled: false,
          },
        },
        {
          type: "number",
          /*
          min: -20,
          max: 100
          */
          position: "left",
          line: {
            enabled: false,
          },
          label: {
            color: "white"
          },
          gridLine: {
            enabled: false,
          },
          crossLines: [
            {
              type: "line",
              value: 0.0,
              stroke: "gray",
              lineDash: [6, 12]
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
  }
}
