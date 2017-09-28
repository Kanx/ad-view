import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Advert} from '../shared/advert.interface';

@Component({
  selector: 'app-advert-description',
  templateUrl: './advert-description.component.html',
  styleUrls: ['./advert-description.component.scss']
})
export class AdvertDescriptionComponent implements OnInit {
  @Input()
  advert: Advert;

  @Output() descriptionToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() setAdvertStatus: EventEmitter<Object> = new EventEmitter<boolean>();

  @Input()
  descriptionVisible: boolean;


  constructor() { }

  ngOnInit() {}

  setStatus(id, status) {
    this.setAdvertStatus.emit({id, status});
  }

  toggleDescription() {
    this.descriptionToggle.emit(!this.descriptionVisible);
  }
}
