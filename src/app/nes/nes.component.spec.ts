import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NesComponent } from './nes.component';

describe('NesComponent', () => {
  let component: NesComponent;
  let fixture: ComponentFixture<NesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
