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

  constructor(private service: UrlService) { }

  ngOnInit() {
  }

  shortenUrl() {
    this.service.createShortUrl(this.input.url).subscribe((data) => {
      this.shortUrl = data.toString();
    });
  }

}
