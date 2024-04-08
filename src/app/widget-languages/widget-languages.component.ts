import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-widget-languages',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './widget-languages.component.html',
  styleUrl: '../surface/surface.component.css'
})
export class WidgetLanguagesComponent {

  @Input() system_language : string = '';
  @Output() eventLangChanged= new EventEmitter<string>;

  languages_de: Array<{code: string, language: string}> = [{code: 'de', language: 'Deutsch'},{code: 'en', language: 'Englisch'}];
  languages_en: Array<{code: string, language: string}> = [{code: 'en', language: 'English'},{code: 'de', language: 'German'}];

  clickLanguages(event: any)
  {
    if (event.target.value != 'XX')
    {
      this.system_language = event.target.value;
      this.eventLangChanged.emit(this.system_language);
    }
  }
}
