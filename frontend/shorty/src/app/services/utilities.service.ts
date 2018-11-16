import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  sortData(arr: any[], field: string, sortDirection: number, isDate?: Boolean): any[] {
    arr.sort((a, b) => {
      let value = 0;
      if (isDate) {
        const date1 = moment(a[field]);
        const date2 = moment(b[field]);
        if (date1.isAfter(date2)) {
          value =  1 * sortDirection;
        } else if (date2.isAfter(date1)) {
          value = -1 * sortDirection;
        } else if (isNaN(date1.valueOf())) {
          value = 1 * sortDirection;
        } else if (isNaN(date2.valueOf())) {
          value = -1 * sortDirection;
        }
      } else {
        if (a[field] > b[field]) {
          value = 1 * sortDirection;
        } else if (a[field] < b[field]) {
          value = -1 * sortDirection;
        }
      }

      return value;
    });
    // returning sorted array
    return arr;
  }
}
