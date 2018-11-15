import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  urlRoutePath = '';

  constructor(private http: HttpClient, private router: Router) {
    this.urlRoutePath = `${environment.backendBaseUrl}/url`;
  }

  createShortUrl(url, expiry) {
    return this.http.post(this.urlRoutePath, { url, expiry }, { responseType: 'text' });
  }

  getResolvedLongUrl(shorturl) {
    const path = `${this.urlRoutePath}?shorturl=${shorturl}`;
    return this.http.get(path, { responseType: 'text' })
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.router.navigateByUrl(
              `/404`,
              { skipLocationChange: false }
            );
          } else if (err.status === 403) {
            // TODO: navigate to a new route /expired which says
            // link is expired and cannot be accessed
            this.router.navigateByUrl(
              `/expired`,
              { skipLocationChange: false }
            );
          }
          // console.log(err);
          return err;
        })
      );
  }
}
