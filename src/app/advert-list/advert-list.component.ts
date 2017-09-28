import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Advert} from '../shared/advert.interface';
import {Router} from '@angular/router';
import {AdvertService} from '../advert.service';
import FileSaver from 'file-saver';

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

  constructor(private router: Router, private advertService: AdvertService) { }

  ngOnInit() {}

  navigateToAdvert(advertId, status) {
    if (status !== -1) {
      this.router.navigate(['review', advertId ]);

    }
  }

  exportExcel() {
    this.advertService.exportExcel()
      .subscribe(data  => { FileSaver.saveAs(new Blob([data], { type: 'application/vnd.ms-excel'}), 'ad-view-data.xlsx'); },
        error => console.log('Error downloading the file.'),
        ()    => console.log('Completed file download.'));
  }

  toggleDescription() {
    this.descriptionToggle.emit(!this.descriptionVisible);
  }

}
