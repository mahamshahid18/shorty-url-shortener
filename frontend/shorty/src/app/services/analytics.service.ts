import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analyticsUrlPath = '';

  constructor(private http: HttpClient, private router: Router) {
    this.analyticsUrlPath = `${environment.backendBaseUrl}/analytics`;
  }

  getAllUrls() {
    return this.http.get(this.analyticsUrlPath)
      .pipe(
        catchError(err => {
          console.log(err);
          return err;
        })
      );
  }

  getUrl(shorturl) {
    return this.http.get(`${this.analyticsUrlPath}?shorturl=${shorturl}`)
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.router.navigateByUrl(
              `/404`,
              { skipLocationChange: false }
            );
          }
          console.log(err);
          return err;
        })
      );
  }


}
