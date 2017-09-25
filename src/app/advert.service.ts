import { Injectable, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../environments/environment';
import { Advert } from './shared/advert.interface';

@Injectable()
export class AdvertService {
  private _advertData = new BehaviorSubject<Advert[]>([]);

  reviewInitiated = false;
  advertArray = this._advertData.asObservable();

  targetSite = 'jobs';

  constructor(private http: Http, private router: Router) {}

  parseReferenceString(referenceString: string): Array<any> {
    return referenceString.split(' ');
  }

  fetchAdvert(reference: string): void {
    this.http.get(`${environment.apiURL}/adverts/${this.targetSite}/${reference}`).subscribe(data => {
      const payload = data.json();
      payload.passed = null;
      this.addAdvert(payload);
    });
  }

  initiateReview(referenceString: string, website: string): void {
    this.targetSite = website;
    this.clearAdverts();
    const referenceMap = this.parseReferenceString(referenceString);
    if (referenceMap.length > 0) {
      this.reviewInitiated = true;
      referenceMap.forEach(ref => {
        this.fetchAdvert(ref);
      });
      this.router.navigate(['/review', 1]);
    } else {
      // TODO: Handle error logic
    }
  }

  getAdverts() {
    return this._advertData.getValue();
  }

  addAdvert(advert: any): void {
    this._advertData.next(this._advertData.getValue().concat([advert]));
  }

  updateAdvert(advert: any, index: number): void {
    const arr = this._advertData.getValue();
    console.log(arr);
    arr[index] = advert;
    this._advertData.next(arr);
  }

  clearAdverts() {
    this._advertData.next([]);
  }
}
