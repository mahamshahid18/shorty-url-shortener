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
  url = {};

  constructor(private service: AnalyticsService, private route: ActivatedRoute) {
    this.url = {
      long_url: '',
      short_url: ''
    };
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

  checkLinkExpired(expiryTime: any) {
    if (!expiryTime) {
      return false;
    }

    const currentTime: any = new Date();
    const timeDiff = moment(expiryTime).diff(moment(currentTime));
    const expired = timeDiff > 0 ? true : false;
    return expired;
  }

  getAccessTimeString(time) {
    return `${moment(time).fromNow()}`;
  }

  getLinkName(url) {
    return url.replace('http://', '').replace('https://', '') || url;
  }

}
