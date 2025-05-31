import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAnatomyComponent } from './medical-anatomy.component';

describe('MedicalAnatomyComponent', () => {
  let component: MedicalAnatomyComponent;
  let fixture: ComponentFixture<MedicalAnatomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalAnatomyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalAnatomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
