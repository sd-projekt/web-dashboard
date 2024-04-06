import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-widget-chart-bar-voltage-hv',
  standalone: true,
  imports: [AgChartsAngular],
  // ag-charts-angular component with chartOptions attribute
  template:
    `<ag-charts-angular
    style="height: 100%;"
    [options]="chartOptions">
   </ag-charts-angular>`
})
export class WidgetChartBarVoltageHvComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { time: '14:30:00',voltage_hv: 230,},
      ],
      // Series: Defines which chart type and data to use
      series: [
        { type: 'bar', xKey: 'time', yKey: 'voltage_hv', yName: 'Spannung'}
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

