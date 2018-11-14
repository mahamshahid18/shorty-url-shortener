import { Component, OnInit } from '@angular/core';

import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-view-url',
  templateUrl: './component-templates/view-url.component.html',
  styleUrls: ['./component-styles/view-url.component.css']
})
export class ViewUrlComponent implements OnInit {

  constructor(private service: UrlService) { }

  ngOnInit() {
    const url = window.location.href;
    this.service.getResolvedLongUrl(url).subscribe((longUrl: Location) => {
      window.location = longUrl;
    });
  }

}
