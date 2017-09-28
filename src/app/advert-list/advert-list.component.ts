import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Advert} from '../shared/advert.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-advert-list',
  templateUrl: './advert-list.component.html',
  styleUrls: ['./advert-list.component.scss']
})
export class AdvertListComponent implements OnInit {
  @Input()
  adverts: Advert[];

  @Input()
  currentAdvert: number;

  @Output() descriptionToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  descriptionVisible: boolean;

  @Input()
  advertsLoaded = false;

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToAdvert(advertId, status) {
    if (status !== -1) {
      this.router.navigate(['review', advertId ]);

    }
  }

  toggleDescription() {
    this.descriptionToggle.emit(!this.descriptionVisible);
  }

}
