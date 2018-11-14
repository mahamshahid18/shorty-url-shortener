import { Component, OnInit, OnDestroy } from '@angular/core';

import { AnalyticsService } from '../services/analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './component-templates/analytics.component.html',
  styleUrls: ['./component-styles/analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy {

  urlsData: any[];
  subscription: Subscription;

  constructor(private service: AnalyticsService) {
    this.urlsData = [];
  }

  ngOnInit() {
    this.subscription = this.service.getAllUrls()
      .subscribe((result: any) => {
        this.urlsData = result;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLink(id) {
    return `/analytics/${ id }`;
  }

}
