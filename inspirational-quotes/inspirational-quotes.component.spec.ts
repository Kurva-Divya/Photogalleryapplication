import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationalQuotesComponent } from './inspirational-quotes.component';

describe('InspirationalQuotesComponent', () => {
  let component: InspirationalQuotesComponent;
  let fixture: ComponentFixture<InspirationalQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationalQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspirationalQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
