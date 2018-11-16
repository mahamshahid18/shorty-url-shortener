import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';

import { Subscription } from 'rxjs';
import { AnalyticsService } from '../services/analytics.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './component-templates/analytics.component.html',
  styleUrls: ['./component-styles/analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy, DoCheck {

  urlsData: any[];
  subscription: Subscription;
  sortByField: string;
  sortByAscending: Boolean;

  constructor(private service: AnalyticsService, private util: UtilitiesService) {
    this.urlsData = [];
  }

  ngOnInit(): void {
    this.sortByField = 'access_count';
    this.sortByAscending = true;
    const sortDirection = this.sortByAscending ? 1 : -1;

    this.subscription = this.service.getAllUrls()
      .subscribe((result: any) => {
        this.urlsData = this.util.sortData(result, this.sortByField, sortDirection, false);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngDoCheck(): void {
    const sortDirection = this.sortByAscending ? 1 : -1;
    const isDateField = this.sortByField === 'last_accessed' ? true : false;
    this.urlsData =
      this.util.sortData(this.urlsData, this.sortByField, sortDirection, isDateField);
  }

  getLink(id: string): string {
    return `/analytics/${ id }`;
  }


}
