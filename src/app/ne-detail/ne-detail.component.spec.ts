import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeDetailComponent } from './ne-detail.component';

describe('NeDetailComponent', () => {
  let component: NeDetailComponent;
  let fixture: ComponentFixture<NeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
