import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureLandscapesComponent } from './nature-landscapes.component';

describe('NatureLandscapesComponent', () => {
  let component: NatureLandscapesComponent;
  let fixture: ComponentFixture<NatureLandscapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NatureLandscapesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureLandscapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
