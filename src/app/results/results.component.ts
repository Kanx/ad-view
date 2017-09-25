import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../advert.service';
import { Advert } from '../shared/advert.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: Advert[];
  constructor(private advertService: AdvertService) { }

  ngOnInit() {
    this.results = this.advertService.getAdverts();
  }

}
