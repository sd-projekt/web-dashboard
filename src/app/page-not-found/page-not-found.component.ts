import { Component } from '@angular/core';
import {VerticalNavbarComponent} from "../vertical-navbar/vertical-navbar.component";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    VerticalNavbarComponent
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
