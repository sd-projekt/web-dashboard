import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-widget-chart-line-acceleration',
  standalone: true,
  imports: [AgChartsAngular],
  // ag-charts-angular component with chartOptions attribute
  template:
    `<ag-charts-angular
    style="height: 100%;"
    [options]="chartOptions">
   </ag-charts-angular>`
})
export class WidgetChartLineAccelerationComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { time: '14:30:00', acceleration_fl: 10.0, acceleration_fr: 2.0, acceleration_rl: 26.5, acceleration_rr: -12.0 },
        { time: '14:30:01', acceleration_fl: 12.0, acceleration_fr: 2.4, acceleration_rl: 20.8, acceleration_rr: 2.2},
        { time: '14:30:02', acceleration_fl: 9.0, acceleration_fr: -2.2, acceleration_rl: 14.9, acceleration_rr: 6.4},
        { time: '14:30:03', acceleration_fl: 5.0, acceleration_fr: 6.8, acceleration_rl: 18.9, acceleration_rr: 12.3 },
        { time: '14:30:04', acceleration_fl: 13.2, acceleration_fr: 13.4, acceleration_rl: 10.9, acceleration_rr: 3.4 },
        { time: '14:30:05', acceleration_fl: 19.4, acceleration_fr: 24.0, acceleration_rl: 26.4, acceleration_rr: 16.2 },
      ],
      // Series: Defines which chart type and data to use
      series: [
        { type: 'line', xKey: 'time', yKey: 'acceleration_fl', yName: 'FL'},
        { type: 'line', xKey: 'time', yKey: 'acceleration_fr', yName: 'FR'},
        { type: 'line', xKey: 'time', yKey: 'acceleration_rl', yName: 'RL'},
        { type: 'line', xKey: 'time', yKey: 'acceleration_rr', yName: 'RR'},
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
          position: "left",
          label: {
            color: "white"
          },
          line: {
            enabled: false,
          },
          crossLines: [
            {
              type: "line",
              value: 0.0,
              stroke: "gray",
              lineDash: [6, 12]
            } ],
          gridLine: {
            enabled: false,
          },

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
