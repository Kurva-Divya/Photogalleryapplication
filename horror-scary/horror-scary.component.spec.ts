import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorrorScaryComponent } from './horror-scary.component';

describe('HorrorScaryComponent', () => {
  let component: HorrorScaryComponent;
  let fixture: ComponentFixture<HorrorScaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorrorScaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorrorScaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
