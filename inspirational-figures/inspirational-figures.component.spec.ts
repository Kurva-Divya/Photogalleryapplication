import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationalFiguresComponent } from './inspirational-figures.component';

describe('InspirationalFiguresComponent', () => {
  let component: InspirationalFiguresComponent;
  let fixture: ComponentFixture<InspirationalFiguresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationalFiguresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspirationalFiguresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
