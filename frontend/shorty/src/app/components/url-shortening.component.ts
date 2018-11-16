import { Component, OnInit, OnDestroy } from '@angular/core';

import { UrlService } from '../services/url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-url-shortening',
  templateUrl: './component-templates/url-shortening.component.html',
  styleUrls: ['./component-styles/url-shortening.component.css']
})
export class UrlShorteningComponent implements OnInit, OnDestroy {

  shortUrl = '';
  input = {
    url: ''
  };
  hourValues: number[];
  subscription: Subscription;
  expirySelected: number;

  constructor(private service: UrlService) {
    // 168 hours in a week, links can be active for
    // a max of 1 week
    this.hourValues = new Array(168);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  shortenUrl(): void {
    this.subscription = this.service.createShortUrl(this.input.url, this.expirySelected).subscribe((data) => {
      this.shortUrl = data.toString();
    });
  }

}
