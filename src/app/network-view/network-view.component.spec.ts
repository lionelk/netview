import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkViewComponent } from './network-view.component';

describe('NetworkViewComponent', () => {
  let component: NetworkViewComponent;
  let fixture: ComponentFixture<NetworkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ this ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(this);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
