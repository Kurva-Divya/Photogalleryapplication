import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisturbingNewsComponent } from './disturbing-news.component';

describe('DisturbingNewsComponent', () => {
  let component: DisturbingNewsComponent;
  let fixture: ComponentFixture<DisturbingNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisturbingNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisturbingNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
