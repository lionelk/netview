import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunnelViewComponent } from './tunnel-view.component';

describe('TunnelViewComponent', () => {
  let component: TunnelViewComponent;
  let fixture: ComponentFixture<TunnelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunnelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunnelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
