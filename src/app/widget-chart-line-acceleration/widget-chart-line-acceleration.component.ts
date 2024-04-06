import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AgChartsAngular} from "ag-charts-angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-widget-chart-line-acceleration',
  standalone: true,
  imports: [
    AgChartsAngular,
    NgIf
  ],
  template: `
    <ag-charts-angular
      *ngIf="chartOptions"
      style="height: 100%; width: 75%;"
      [options]="chartOptions">
    </ag-charts-angular>
  `
})
export class WidgetChartLineAccelerationComponent {

  // Chart Options
  public chartOptions: AgChartOptions;

  constructor(private http: HttpClient) {

    var dataArray: Array<any> = [];

    this.getData().subscribe(data => {
      dataArray = data;
      console.log(dataArray)
      this.chartOptions= {
        series: [
          { type: 'line', xKey: 'time', yKey: 'acceleration', yName: 'Acceleration'},
        ],
        data: dataArray,
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
            min: -5,
            max: 5,
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
    this.startUpdates()
  }


  getData() {
    const accelerationURL = "http://localhost:8000/data/acceleration/value";

    return this.http.get<any>(accelerationURL + "?fromWhen=1m").pipe(
      map((response) => {
        const resultArray = [];
        const dataArray = response.results;

        for (let i = 0; i < dataArray.length; i++) {
          const newDataEntry = {
            time: String(dataArray[i].timestamp.split("T")[1].split(".")[0]),
            acceleration: Number(dataArray[i].value)
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
