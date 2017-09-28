import {Component, OnInit } from '@angular/core';
import { AdvertService } from '../advert.service';
import { Advert } from '../shared/advert.interface';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  currentAdvertNumber: number;
  advertList: Advert[];
  descriptionVisible = true;

  constructor(private advertService: AdvertService, private route: ActivatedRoute, private router: Router) {
    // Redirect to splash page if user opens application on a review URL
    if (!this.advertService.reviewInitiated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // Subscribe to advert feed
    this.advertService.advertArray.subscribe(adverts =>
      this.advertList = adverts
    );
    // Subscribe to current route parameter
    this.route.params.subscribe(params => {
      this.currentAdvertNumber = parseInt(params['id'], 10);
    });
  }

  advertsAreLoaded(): boolean {
    return this.advertService.referenceRequestList.length === this.advertList.length;
  }

  currentAdvert(): Advert {
    return this.advertList[this.currentAdvertNumber - 1];
  }

  setStatus(event): void {
    const { id, status } = event;
    const advert = this.advertList[id - 1];
    // -1: Not found
    //  0: Advert found
    //  1: Passed audit
    //  2: Failed audit
    advert.status = status;
    this.advertService.updateAdvert(advert, id - 1);
    if (++this.currentAdvertNumber <= this.advertList.length) {
      this.router.navigate(['/review', id + 1]);
    } else {
      --this.currentAdvertNumber;
    }
  }

  updateDescriptionState(state): void {
    this.descriptionVisible = state;
  }

}
