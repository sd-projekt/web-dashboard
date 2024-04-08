import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NavbarItem} from "../vertical-navbar/navbar_item.model";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-item-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './item-navbar.component.html',
  styleUrl: './item-navbar.component.css'
})
export class ItemNavbarComponent implements OnInit{
  // Assign menu list items
  @Input() navbar_entry: NavbarItem |undefined;

  // Currently selected menu item
  @Input() menuState = 'Home';

  // Event binding to the vertical nav bar component to update menu state
  @Output() eventnavClicked= new EventEmitter<string>;


  constructor()
  {
    this.menuState = 'Home';
  }

  ngOnInit() {
    // By startup, load menu item home and area-home component
    this.menuState = 'Home';
  }

  // Update menu, triggered trough click event
  clickNavItem()
  {
    // Update menu state on th vertical navigation bar component
    this.eventnavClicked.emit(this.navbar_entry?.name);
  }
}
