import {Component} from '@angular/core';
import {VerticalNavbarComponent} from "../vertical-navbar/vertical-navbar.component";
import {SurfaceComponent} from "../surface/surface.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    VerticalNavbarComponent,
    SurfaceComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  // variable to allow communication between surface and navigation bar components
  // Input: vertical nav bar component
  // Output: surface component
  posNavigation = '';
}
