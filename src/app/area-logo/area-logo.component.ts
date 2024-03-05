import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {interval, Subscription} from "rxjs";
import {RenderModelComponent} from "../render-model/render-model.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-area-logo',
  standalone: true,
  imports: [
    HttpClientModule,
    RenderModelComponent,
    NgIf
  ],
  templateUrl: './area-logo.component.html',
  styleUrls: [
    './area-logo.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaLogoComponent implements OnInit{

  @Input() system_language : string = '';

  // API used to identify the current time
  urlTimeApi = 'https://worldtimeapi.org/api/ip';
  time : any;
  subscriptionTimer : Subscription;
  // Intervall to update the current time, in milliseconds
  timer = 60000;

  // API used to identify current ip and geolocation
  urlGeolocationApi = 'http://ip-api.com/json/?lang=de&fields=country,city,region,query';
  geolocation = '';
  ipaddress = '';

  ngOnInit() {
    // Load current time, geolocation and ip by startup once
    this.updateTime();
    this.updateLocation();
  }

  constructor(private http: HttpClient) {
    // Timer to update the current time in a regular interval, defined by the timer variable
    this.subscriptionTimer = interval(this.timer).subscribe(x =>{this.updateTime()});
  }

  // Update the current time
  updateTime()
  {
    // If internet connection breaks, load this string
    this.time = 'Loading';
    // GET request to the api to catch data
    this.http.get(this.urlTimeApi).subscribe(
      (response : any) =>
      {
        // Access to the response in JSON format
        this.time = response.datetime;

        // Strip the string to catch only necessary data
        this.time = this.time.slice(0, -16);

        // Replace the letter T with space
        this.time = this.time.replace("T", " ");
      }
    );
  }

  updateLocation()
  {
    this.geolocation = 'Loading';
    this.http.get(this.urlGeolocationApi).subscribe(
      (response : any) =>
      {
        this.geolocation = response.city + ", " + response.region + ", " + response.country;
        this.ipaddress = response.query;
      }
    );
  }
}
