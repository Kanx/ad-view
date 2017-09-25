import { Component, OnInit } from '@angular/core';
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

  constructor(private advertService: AdvertService, private route: ActivatedRoute, private router: Router) {
    if (!this.advertService.reviewInitiated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.advertService.advertArray.subscribe(adverts => this.advertList = adverts);
    this.route.params.subscribe(params => {
      this.currentAdvertNumber = parseInt(params['id'], 10);
    });
  }

  currentAdvert() {
    return this.advertList[this.currentAdvertNumber - 1];
  }

  setPassStatus(status: boolean): void {
    const advert = this.advertList[this.currentAdvertNumber - 1];
    advert.passed = status;
    this.advertService.updateAdvert(advert, this.currentAdvertNumber - 1);
    if (++this.currentAdvertNumber > this.advertList.length) {
      this.router.navigate(['/results']);
    } else {
      this.router.navigate(['/review', this.currentAdvertNumber]);
    }
  }

}
