import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentTravelComponent } from './entertainment-travel.component';

describe('EntertainmentTravelComponent', () => {
  let component: EntertainmentTravelComponent;
  let fixture: ComponentFixture<EntertainmentTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntertainmentTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntertainmentTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
