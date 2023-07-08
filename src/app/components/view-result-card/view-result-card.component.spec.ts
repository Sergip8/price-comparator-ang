import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultCardComponent } from './view-result-card.component';

describe('ViewResultCardComponent', () => {
  let component: ViewResultCardComponent;
  let fixture: ComponentFixture<ViewResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResultCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
