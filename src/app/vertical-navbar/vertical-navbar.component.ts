import {Component, EventEmitter, Output} from '@angular/core';
import {ItemNavbarComponent} from "../item-navbar/item-navbar.component";
import {NavbarItem} from "./navbar_item.model";

@Component({
  selector: 'app-vertical-navbar',
  standalone: true,
  imports: [
      ItemNavbarComponent,
  ],
  templateUrl: './vertical-navbar.component.html',
  styleUrl: './vertical-navbar.component.css'
})
export class VerticalNavbarComponent {
  // Load the different menu options
  nav_logo = new NavbarItem("Logo", "assets/images/logo.png", "assets/images/logo.png", "Logo des OW Racing-Team");
  nav_home = new NavbarItem("Home", "assets/images/home.svg", "assets/images/home_selected.svg", "Startseite / Hauptseite");
  nav_battery = new NavbarItem("Battery", "assets/images/battery.svg", "assets/images/battery_selected.svg", "Batterie und Batteriemanagement");
  nav_motor = new NavbarItem("Motor", "assets/images/motor.svg", "assets/images/motor_selected.svg","Motorkenndaten");
  nav_controller = new NavbarItem("Controller", "assets/images/controller.svg", "assets/images/controller_selected.svg", "Frequenzumrichter, Steuergeräte");
  nav_settings= new NavbarItem("Settings", "assets/images/settings.svg", "assets/images/settings_selected.svg","Systemeinstellungen");

  // Currently selected menu option
  menuState = '';

  // Event binding to the homepage component
  @Output() eventNavClicked= new EventEmitter<string>;

  // Is executed, if navigation item is clicked
  clickNavItem()
  {
    // Share the updated selcted menu option to the homepage component
    this.eventNavClicked.emit(this.menuState);
  }

}
