import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WidgetLanguagesComponent} from "../widget-languages/widget-languages.component";
import {NgIf} from "@angular/common";
import {formatDate} from "@angular/common";
import {interval} from "rxjs";
import {Subscription} from "rxjs";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularDeviceInformationComponent, AngularDeviceInformationService} from "angular-device-information";

@Component({
  selector: 'app-area-settings',
  standalone: true,
  providers: [AngularDeviceInformationComponent],
  imports: [
    WidgetLanguagesComponent,
    NgIf,
    HttpClientModule
  ],
  templateUrl: './area-settings.component.html',
  styleUrls: [
    './area-settings.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaSettingsComponent implements OnInit{

  ngOnInit() {
    // Load current time, geolocation and ip by startup once
    this.updateLocation();
  }

  @Input() runtime_init : number;

  now: number
  time : string = '';
  subscriptionTimer: Subscription;


  system_os: String;
  system_os_version: number;
  system_browser: String;
  system_browser_version: String;
  system_screen_resolution: String;
  system_cookies: boolean;
  system_user_agent: String;
  system_device_type: String;

  // API used to identify current ip and geolocation
  urlGeolocationApi = 'http://ip-api.com/json/?lang=de&fields=country,city,region,query';
  geolocation = '';
  ipaddress = '';



  constructor(private deviceInformations: AngularDeviceInformationService, private http: HttpClient) {
    this.subscriptionTimer = interval(1000).subscribe(x =>{this.updateRuntime()});
    this.system_os = deviceInformations.getDeviceInfo().os;
    this.system_os_version = deviceInformations.getDeviceInfo().osVersion;

    this.system_browser = deviceInformations.getDeviceInfo().browser;
    this.system_browser_version = deviceInformations.getDeviceInfo().browserVersion;

    this.system_screen_resolution = deviceInformations.getDeviceInfo().screen_resolution;

    this.system_cookies = deviceInformations.getDeviceInfo().cookies;

    this.system_user_agent = deviceInformations.getDeviceInfo().userAgent;

    this.system_device_type = deviceInformations.getDeviceType();

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

  updateRuntime()
  {
    this.now = Date.now();
    this.now = Date.now() - this.runtime_init;
    //this.now = this.now - this.runtime_init;
    this.time = formatDate(this.now, 'HH:mm:ss', 'en-US', '+0');
  }



  selectedLanguage : string = '';



  @Input() system_language : string = '';
  @Output() eventLangChanged= new EventEmitter<string>;

  updateLanguage()
  {
    console.log(this.selectedLanguage)
    this.eventLangChanged.emit(this.selectedLanguage);
  }
}
