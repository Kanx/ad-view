import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchBarComponent } from './launch-bar.component';

describe('LaunchBarComponent', () => {
  let component: LaunchBarComponent;
  let fixture: ComponentFixture<LaunchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
