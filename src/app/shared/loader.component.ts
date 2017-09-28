import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="loader">
    <p *ngIf="message">{{message}}</p>
    <div class="table">
      <div class="cell">
        <div class="gmb-loader {{size}}">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input()
  message: string;
  @Input()
  size: string;
}
