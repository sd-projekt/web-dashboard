import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-widget-chart-scatter-temperature',
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
export class WidgetChartScatterTemperatureComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor(private http: HttpClient) {
    var dataArray: Array<any> = [];

    this.getDataL().subscribe(dataL => {
      this.getDataR().subscribe(dataR => {
        for (let i = 0; i < dataL.length; i++) {
          var dataEntry = {
            time: dataL[i].time,
            valueL: dataL[i].valueL,
            valueR: dataR[i].valueR
          }

          dataArray.push(dataEntry)
        }

        this.chartOptions = {
          // Data: Data to be displayed in the chart
          data: dataArray,
          // Series: Defines which chart type and data to use
          series: [
            { type: 'scatter', xKey: 'time', yKey: 'valueL', yName: 'Links'},
            { type: 'scatter', xKey: 'time', yKey: 'valueR', yName: 'Rechts'},
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
      })
    })

  }

  getDataL() {
    const dataURL = "http://localhost:8000/data/motor/temperature_left"

    return this.http.get<any>(dataURL + "?fromWhen=1m").pipe(
      map((response) => {
        const resultArray = [];
        const dataArray = response.results;

        for (let i = 0; i < dataArray.length; i++) {
          const newDataEntry = {
            time: String(dataArray[i].timestamp.split("T")[1].split(".")[0]),
            valueL: Number(dataArray[i].value)
          };
          resultArray.push(newDataEntry);
        }

        console.log(resultArray);
        return resultArray;
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  getDataR() {
    const dataURL = "http://localhost:8000/data/motor/temperature_right"

    return this.http.get<any>(dataURL + "?fromWhen=1m").pipe(
      map((response) => {
        const resultArray = [];
        const dataArray = response.results;

        for (let i = 0; i < dataArray.length; i++) {
          const newDataEntry = {
            time: String(dataArray[i].timestamp.split("T")[1].split(".")[0]),
            valueR: Number(dataArray[i].value)
          };
          resultArray.push(newDataEntry);
        }

        console.log(resultArray);
        return resultArray;
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  update = () => {
    const options = { ...this.chartOptions };

    var dataArray: Array<any> = [];

    this.getDataL().subscribe(dataL => {
      this.getDataR().subscribe(dataR => {
        for (let i = 0; i < dataL.length; i++) {
          var dataEntry = {
            time: dataL[i].time,
            valueL: dataL[i].valueL,
            valueR: dataR[i].valueR
          }

          dataArray.push(dataEntry)
        }

        options.data = dataArray;
      })
    });

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
