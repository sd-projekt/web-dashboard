import { Routes } from '@angular/router';
import { HomePageComponent } from "./home-page/home-page.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Fahrzeugübersicht'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Seite nicht gefunden'
  }
];
