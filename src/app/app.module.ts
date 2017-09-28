import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { LoaderComponent } from './shared/loader.component';
import { HttpModule } from '@angular/http';

import { AdvertService } from './advert.service';
import { ResultsComponent } from './results/results.component';
import { LaunchBarComponent } from './launch-bar/launch-bar.component';
import { AdvertDescriptionComponent } from './advert-description/advert-description.component';
import { AdvertListComponent } from './advert-list/advert-list.component';

const appRoutes: Routes = [
  { path: 'review/:id', component: ReviewComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    ReviewComponent,
    ResultsComponent,
    LoaderComponent,
    LaunchBarComponent,
    AdvertDescriptionComponent,
    AdvertListComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AdvertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
