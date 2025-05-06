import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMainComponent } from './loading-main.component';

describe('LoadingMainComponent', () => {
  let component: LoadingMainComponent;
  let fixture: ComponentFixture<LoadingMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingMainComponent]
    });
    fixture = TestBed.createComponent(LoadingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
