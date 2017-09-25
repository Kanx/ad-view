import { Component } from '@angular/core';
import { AdvertService } from './advert.service';


@Component({
  selector: 'app-root',
  providers: [AdvertService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
