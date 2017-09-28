import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertDescriptionComponent } from './advert-description.component';

describe('AdvertDescriptionComponent', () => {
  let component: AdvertDescriptionComponent;
  let fixture: ComponentFixture<AdvertDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
