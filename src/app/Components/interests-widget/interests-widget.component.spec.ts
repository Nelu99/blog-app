import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsWidgetComponent } from './interests-widget.component';

describe('InterestsWidgetComponent', () => {
  let component: InterestsWidgetComponent;
  let fixture: ComponentFixture<InterestsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
