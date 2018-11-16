import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { environment } from '../../environments/environment';

import { Subscription } from 'rxjs';
import { AnalyticsService } from '../services/analytics.service';


@Component({
  selector: 'app-analytics-item',
  templateUrl: './component-templates/analytics-item.component.html',
  styleUrls: ['./component-styles/analytics-item.component.css']
})
export class AnalyticsItemComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  url = {
    short_id: '',
    short_url: '',
    long_url: '',
    expiry: 0,
    created_at: '',
    access_count: 0,
    last_accessed: '',
  };

  constructor(private service: AnalyticsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const shortid = this.route.snapshot.params['shorturl'];
    const completeUrl = `${environment.appBaseUrl}/${shortid}`;
    this.subscription = this.service.getUrl(completeUrl)
      .subscribe((data) => {
        this.url = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkLinkExpired(expiryHours: number, createdTimeString: string): Boolean {
    const currentTime: Date = new Date();
    const createdTime: Date = new Date(createdTimeString);

    const createdTimeHours = Math.round(createdTime.valueOf() / 3600000);
    const currentTimeHours = Math.round(currentTime.valueOf() / 3600000);

    const expired = createdTimeHours + expiryHours < currentTimeHours ? true : false;
    return expired;
  }

  getAccessTimeString(time: string): string {
    let formattedString = 'N/A';

    if (time) {
      formattedString = `${moment(time).fromNow()}`;
    }
    return formattedString;
  }

  getLinkName(url: string): string {
    return url.replace('http://', '').replace('https://', '') || url;
  }

}
