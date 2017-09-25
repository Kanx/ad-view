import {Component, OnInit } from '@angular/core';
import { AdvertService } from '../advert.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  references: string;
  website: string;
  referencesForm: FormGroup;


  constructor(private advertService: AdvertService) {}

  ngOnInit(): void {
    this.referencesForm = new FormGroup({
      references: new FormControl(this.references, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/([0-9]{5})+?/) // TODO - Improve logic to match longer strings
      ]),
      website: new FormControl(this.website, [
        Validators.required
      ])
    });
  }

  onSubmit = () => {
    this.advertService.initiateReview(this.references, 'jobs');
  }

  test() {
    console.log(this.advertService.getAdverts());
  }

  get referenceField() { return this.referencesForm.get('references'); }

}
