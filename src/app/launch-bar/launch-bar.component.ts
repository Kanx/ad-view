import { Component, OnInit } from '@angular/core';
import { AdvertService } from '../advert.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-launch-bar',
  templateUrl: './launch-bar.component.html',
  styleUrls: ['./launch-bar.component.scss']
})
export class LaunchBarComponent implements OnInit {

  references = '';
  website = 'jobs';
  referencesForm: FormGroup;

  constructor(private advertService: AdvertService) {}

  ngOnInit(): void {
    this.referencesForm = new FormGroup({
      references: new FormControl(this.references, [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/([0-9]{5})+?/) // TODO - Improve logic to match longer strings; consider negative lookahead
      ]),
      website: new FormControl(this.website, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    this.advertService.initiateReview(this.references, this.website);
  }

  get referenceField() { return this.referencesForm.get('references'); }

}
