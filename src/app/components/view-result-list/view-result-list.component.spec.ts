import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultListComponent } from './view-result-list.component';

describe('ViewResultListComponent', () => {
  let component: ViewResultListComponent;
  let fixture: ComponentFixture<ViewResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResultListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
