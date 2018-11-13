import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../components/app.component';
import { AnalyticsComponent } from '../components/analytics.component';
import { AnalyticsItemComponent } from '../components/analytics-item.component';
import { UrlShorteningComponent } from '../components/url-shortening.component';
import { ViewUrlComponent } from '../components/view-url.component';
import { NotFoundComponent } from '../components/not-found.component';

const appRoutes: Routes = [
  { path: '', component: UrlShorteningComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'analytics/:shorturl', component: AnalyticsItemComponent },
  { path: '404', component: NotFoundComponent },
  { path: ':url', component: ViewUrlComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AnalyticsComponent,
    AnalyticsItemComponent,
    UrlShorteningComponent,
    ViewUrlComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
