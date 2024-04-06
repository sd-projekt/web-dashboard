import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-widget-chart-bar-shock_absorber',
  standalone: true,
  imports: [AgChartsAngular],
  // ag-charts-angular component with chartOptions attribute
  template:
    `<ag-charts-angular
    style="height: 100%;"
    [options]="chartOptions">
   </ag-charts-angular>`
})
export class WidgetChartBarShockAbsorberComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { time: '14:30:00', shock_absorber_fl: 6, shock_absorber_fr: 40, shock_absorber_rl: 2, shock_absorber_rr: 22 },
      ],
      // Series: Defines which chart type and data to use
      series: [
        { type: 'bar', xKey: 'time', yKey: 'shock_absorber_fl', yName: 'FL'},
        { type: 'bar', xKey: 'time', yKey: 'shock_absorber_fr', yName: 'FR'},
        { type: 'bar', xKey: 'time', yKey: 'shock_absorber_rl', yName: 'RL'},
        { type: 'bar', xKey: 'time', yKey: 'shock_absorber_rr', yName: 'RR'},
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
          gridLine: {
            enabled: false,
          },
          line: {
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
