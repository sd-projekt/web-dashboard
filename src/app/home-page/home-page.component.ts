import { Component } from '@angular/core';
import {VerticalNavbarComponent} from "../vertical-navbar/vertical-navbar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    VerticalNavbarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
