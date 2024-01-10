import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultListUComponent } from './view-result-listU.component';

describe('ViewResultListComponent', () => {
  let component: ViewResultListUComponent;
  let fixture: ComponentFixture<ViewResultListUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResultListUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResultListUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
