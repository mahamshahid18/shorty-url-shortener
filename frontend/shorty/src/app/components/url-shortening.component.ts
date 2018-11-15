import { Component, OnInit } from '@angular/core';

import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-url-shortening',
  templateUrl: './component-templates/url-shortening.component.html',
  styleUrls: ['./component-styles/url-shortening.component.css']
})
export class UrlShorteningComponent implements OnInit {

  shortUrl = '';
  input = {
    url: ''
  };
  hourValues: number[];

  constructor(private service: UrlService) {
    // 168 hours in a week, links can be active for
    // a max of 1 week
    this.hourValues = new Array(168);
  }

  ngOnInit() {
  }

  shortenUrl(expirySelected) {
    this.service.createShortUrl(this.input.url, expirySelected).subscribe((data) => {
      this.shortUrl = data.toString();
    });
  }

}
