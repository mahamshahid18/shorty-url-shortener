import { Component, OnInit, OnDestroy } from '@angular/core';

import { UrlService } from '../services/url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-url',
  templateUrl: './component-templates/view-url.component.html',
  styleUrls: ['./component-styles/view-url.component.css']
})
export class ViewUrlComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private service: UrlService) { }

  ngOnInit() {
    const url = window.location.href;
    this.subscription = this.service.getResolvedLongUrl(url).subscribe((longUrl: string) => {
      window.location.href = longUrl;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
