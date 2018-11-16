import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from '../components/app.component';
import { AnalyticsComponent } from '../components/analytics.component';
import { AnalyticsItemComponent } from '../components/analytics-item.component';
import { UrlShorteningComponent } from '../components/url-shortening.component';
import { ViewUrlComponent } from '../components/view-url.component';
import { NotFoundComponent } from '../components/not-found.component';
import { LinkExpiredComponent } from '../components/link-expired.component';

import { UrlService } from '../services/url.service';
import { AnalyticsService } from '../services/analytics.service';
import { UtilitiesService } from '../services/utilities.service';

const appRoutes: Routes = [
  { path: '', component: UrlShorteningComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'analytics/:shorturl', component: AnalyticsItemComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'expired', component: LinkExpiredComponent },
  { path: ':url', component: ViewUrlComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AnalyticsComponent,
    AnalyticsItemComponent,
    UrlShorteningComponent,
    ViewUrlComponent,
    NotFoundComponent,
    LinkExpiredComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatChipsModule
  ],
  providers: [
    UrlService,
    AnalyticsService,
    UtilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
