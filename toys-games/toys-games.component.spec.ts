import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToysGamesComponent } from './toys-games.component';

describe('ToysGamesComponent', () => {
  let component: ToysGamesComponent;
  let fixture: ComponentFixture<ToysGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToysGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToysGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
