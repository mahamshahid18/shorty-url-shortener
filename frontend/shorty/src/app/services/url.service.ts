import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient, private router: Router) { }

  createShortUrl(url) {
    return this.http.post(environment.backendBaseUrl, { url }, { responseType: 'text' });
  }

  getResolvedLongUrl(shorturl) {
    const path = `${environment.backendBaseUrl}?shorturl=${shorturl}`;
    return this.http.get(path, { responseType: 'text' })
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.router.navigateByUrl(
              `/404`,
              { skipLocationChange: false }
            );
          }
          return err;
        })
      );
  }
}
