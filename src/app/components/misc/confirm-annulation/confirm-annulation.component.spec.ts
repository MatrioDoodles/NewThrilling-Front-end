import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAnnulationComponent } from './confirm-annulation.component';

describe('ConfirmAnnulationComponent', () => {
  let component: ConfirmAnnulationComponent;
  let fixture: ComponentFixture<ConfirmAnnulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAnnulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAnnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
