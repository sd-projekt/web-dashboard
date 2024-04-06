import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-widget-chart-line-velocity',
  standalone: true,
  imports: [AgChartsAngular],
  // ag-charts-angular component with chartOptions attribute
  template:
    `<ag-charts-angular
    style="height: 100%;"
    [options]="chartOptions">
   </ag-charts-angular>`
})
export class WidgetChartLineVelocityComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { time: '14:30:00', velocity_fl: 26, velocity_fr: 2.0, velocity_rl: 26.5, velocity_rr: -12.0 },
        { time: '14:30:01', velocity_fl: 17, velocity_fr: 2.4, velocity_rl: 20.8, velocity_rr: 2.2},
        { time: '14:30:02', velocity_fl: 40, velocity_fr: -2.2, velocity_rl: 14.9, velocity_rr: 6.4},
        { time: '14:30:03', velocity_fl: 5.0, velocity_fr: 6.8, velocity_rl: 18.9, velocity_rr: 12.3 },
        { time: '14:30:04', velocity_fl: 13.2, velocity_fr: 13.4, velocity_rl: 10.9, velocity_rr: 3.4 },
        { time: '14:30:05', velocity_fl: -19.4, velocity_fr: 24.0, velocity_rl: 26.4, velocity_rr: 16.2 },
      ],
      // Series: Defines which chart type and data to use
      series: [
        { type: 'line', xKey: 'time', yKey: 'velocity_fl', yName: 'FL'},
        { type: 'line', xKey: 'time', yKey: 'velocity_fr', yName: 'FR'},
        { type: 'line', xKey: 'time', yKey: 'velocity_rl', yName: 'RL'},
        { type: 'line', xKey: 'time', yKey: 'velocity_rr', yName: 'RR'},
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
