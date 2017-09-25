import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { HttpModule } from '@angular/http';

import { AdvertService } from './advert.service';
import { ResultsComponent } from './results/results.component';

const appRoutes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    ReviewComponent,
    ResultsComponent
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
