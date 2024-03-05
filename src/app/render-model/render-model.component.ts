import {Component, Renderer2, Inject, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

/* 1. Required to execute javascript */
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-render-model',
  standalone: true,
  imports: [],
  templateUrl: './render-model.component.html',
  styleUrl: './render-model.component.css',
  schemas: [
    // Necessary to load the external web-component of the 3d model from the Google model viewer
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RenderModelComponent {
  // 2. pass then in constructor
  // @ts-ignore
  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private _document)
  {

  }

// 3. call them in ngOnInit
  ngOnInit() {
    // Load the Google model viewer, execute javascript for this purpose.
    const s = this.renderer2.createElement('script');
    s.type = 'module';
    s.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);
  }

}
