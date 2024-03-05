import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WidgetLanguagesComponent} from "../widget-languages/widget-languages.component";


@Component({
  selector: 'app-area-settings',
  standalone: true,
  imports: [
    WidgetLanguagesComponent
  ],
  templateUrl: './area-settings.component.html',
  styleUrls: [
    './area-settings.component.css',
    '../surface/surface.component.css'
  ]
})
export class AreaSettingsComponent{
  selectedLanguage : string = '';

  @Input() system_language : string = '';
  @Output() eventLangChanged= new EventEmitter<string>;

  updateLanguage()
  {
    console.log(this.selectedLanguage)
    this.eventLangChanged.emit(this.selectedLanguage);
  }
}
