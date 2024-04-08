import { Component } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-widget-chart-bar-shock_absorber',
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
export class WidgetChartBarShockAbsorberComponent {
  // Chart Options
  public chartOptions: AgChartOptions;
  constructor(private http: HttpClient) {
    var dataArray: Array<any> = [];
    this.getDataFL().subscribe(dataFL => {
      this.getDataFR().subscribe(dataFR => {
        this.getDataRL().subscribe(dataRL => {
          this.getDataRR().subscribe(dataRR => {
            for (let i = 0; i < 1; i++) {
              console.log(dataFL[i].time)
              console.log(dataFL[i].valueFL)
              console.log(dataFR[i].valueFR)
              console.log(dataRL[i].valueRL)
              console.log(dataRR[i].valueRR)
              console.log("\n")

              var dataEntry = {
                time: dataFL[i].time,
                valueFL: dataFL[i].valueFL,
                valueFR: dataFR[i].valueFR,
                valueRL: dataRL[i].valueRL,
                valueRR: dataRR[i].valueRR
              }

              dataArray.push(dataEntry)
            }

            console.log(dataArray)

            this.chartOptions = {
              // Data: Data to be displayed in the chart
              data: dataArray,
              // Series: Defines which chart type and data to use
              series: [
                { type: 'bar', xKey: 'time', yKey: 'valueFL', yName: 'FL'},
                { type: 'bar', xKey: 'time', yKey: 'valueFR', yName: 'FR'},
                { type: 'bar', xKey: 'time', yKey: 'valueRL', yName: 'RL'},
                { type: 'bar', xKey: 'time', yKey: 'valueRR', yName: 'RR'},
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
                  min: 45,
                  max: 60,
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
          })
        })
      })
    })


  }

  getDataFL() {
    const dataURL = "http://localhost:8000/data/spring_travel/value_fl";

    return this.http.get<any>(dataURL + "?fromWhen=1m").pipe(
      map((response) => {
        const resultArray = [];
        const dataArray = response.results;

        for (let i = 0; i < dataArray.length; i++) {
          const newDataEntry = {
            time: String(dataArray[i].timestamp.split("T")[1].split(".")[0]),
            valueFL: Number(dataArray[i].value)
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

  getDataFR() {
    const dataURL = "http://localhost:8000/data/spring_travel/value_fr";

    return this.http.get<any>(dataURL + "?fromWhen=1m").pipe(
      map((response) => {
        const resultArray = [];
        const dataArray = response.results;

        for (let i = 0; i < dataArray.length; i++) {
          const newDataEntry = {
            time: String(dataArray[i].timestamp.split("T")[1].split(".")[0]),
            valueFR: Number(dataArray[i].value)
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

  getDataRL() {
    const dataURL = "http://localhost:8000/data/spring_travel/value_rl";

    return this.http.get<any>(dataURL + "?fromWhen=1m").pipe(
      map((response) => {
        const resultArray = [];
        const dataArray = response.results;

        for (let i = 0; i < dataArray.length; i++) {
          const newDataEntry = {
            time: String(dataArray[i].timestamp.split("T")[1].split(".")[0]),
            valueRL: Number(dataArray[i].value)
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

  getDataRR() {
    const dataURL = "http://localhost:8000/data/spring_travel/value_rr";

    return this.http.get<any>(dataURL + "?fromWhen=1m").pipe(
      map((response) => {
        const resultArray = [];
        const dataArray = response.results;

        for (let i = 0; i < dataArray.length; i++) {
          const newDataEntry = {
            time: String(dataArray[i].timestamp.split("T")[1].split(".")[0]),
            valueRR: Number(dataArray[i].value)
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

}
