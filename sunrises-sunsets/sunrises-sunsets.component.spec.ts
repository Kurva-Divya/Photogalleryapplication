import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunrisesSunsetsComponent } from './sunrises-sunsets.component';

describe('SunrisesSunsetsComponent', () => {
  let component: SunrisesSunsetsComponent;
  let fixture: ComponentFixture<SunrisesSunsetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunrisesSunsetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunrisesSunsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
