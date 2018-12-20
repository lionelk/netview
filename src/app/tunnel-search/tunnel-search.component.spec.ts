import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunnelSearchComponent } from './tunnel-search.component';

describe('TunnelSearchComponent', () => {
  let component: TunnelSearchComponent;
  let fixture: ComponentFixture<TunnelSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunnelSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunnelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
