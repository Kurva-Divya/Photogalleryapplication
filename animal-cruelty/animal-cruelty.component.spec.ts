import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCrueltyComponent } from './animal-cruelty.component';

describe('AnimalCrueltyComponent', () => {
  let component: AnimalCrueltyComponent;
  let fixture: ComponentFixture<AnimalCrueltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalCrueltyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalCrueltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
