import { Injectable, Input } from '@angular/core';
import {Http, ResponseContentType, RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../environments/environment';
import { Advert } from './shared/advert.interface';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdvertService {
  private _advertData = new BehaviorSubject<Advert[]>([]);

  referenceRequestList: Array<string>;
  reviewInitiated = false;
  advertArray = this._advertData.asObservable();
  targetSite = 'jobs';

  constructor(private http: Http, private router: Router) {}

  parseReferenceString(referenceString: string): Array<any> {
    return referenceString.split(/[\s|\r]/g);
  }

  fetchAdvert(reference: string): void {
    this.http.get(`${environment.apiURL}/adverts/${this.targetSite}/${reference}`).subscribe(data => {
      const payload = data.json();
      // Assign entry with local ID
      payload.id = this._advertData.getValue().length + 1 || 1;
      this.addAdvert(payload);
    });
  }

  initiateReview(referenceString: string, website: string): void {
    this.targetSite = website;
    this.clearAdverts();
    this.referenceRequestList = this.parseReferenceString(referenceString);

    if (this.referenceRequestList.length  > 0) {
      this.reviewInitiated = true;
      this.referenceRequestList.forEach(ref => {
        this.fetchAdvert(ref);
      });
      this.router.navigate(['/review', 1]);
    } else {
      // TODO: Handle error logic
    }
  }

  exportExcel(): Observable<any> {
    return this.http.get(`${environment.apiURL}/adverts/export`, {
      responseType: ResponseContentType.Blob,
      params: {data: JSON.stringify(this.getAdverts()) }
    })
      .map(res => res.blob());
  }

  getAdverts() {
    return this._advertData.getValue();
  }

  addAdvert(advert: any): void {
    this._advertData.next(this._advertData.getValue().concat([advert]));
  }

  updateAdvert(advert: any, index: number): void {
    const arr = this._advertData.getValue();
    arr[index] = advert;
    this._advertData.next(arr);
  }

  clearAdverts() {
    this._advertData.next([]);
  }
}
