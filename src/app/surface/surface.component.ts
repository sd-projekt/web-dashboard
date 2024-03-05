import {Component, Input, OnInit} from '@angular/core';
import {AreaLogoComponent} from "../area-logo/area-logo.component";
import {AreaHomeComponent} from "../area-home/area-home.component";
import {AreaBatteryComponent} from "../area-battery/area-battery.component";
import {AreaMotorComponent} from "../area-motor/area-motor.component";
import {AreaControllerComponent} from "../area-controller/area-controller.component";
import {AreaSettingsComponent} from "../area-settings/area-settings.component";
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";

@Component({
  selector: 'app-surface',
  standalone: true,
  imports: [
    AreaLogoComponent,
    AreaHomeComponent,
    AreaBatteryComponent,
    AreaMotorComponent,
    AreaControllerComponent,
    AreaSettingsComponent,
    NgSwitchCase,
    NgSwitch,
    NgSwitchDefault
  ],
  templateUrl: './surface.component.html',
  styleUrl: './surface.component.css'
})
export class SurfaceComponent implements OnInit{
  // Variable to store the current menu position, Data binding from the homepage component
  @Input() nav_pointer : string = 'home';
  systemLanguage = 'de';
  
  ngOnInit() {
    // by startup, the program shows the menu item "home"
    this.nav_pointer = 'home';
  }

  updateLanguage()
  {
    console.log(this.systemLanguage)
  }

}
