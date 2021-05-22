import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryModuleComponent } from './primary-module.component';

describe('PrimaryModuleComponent', () => {
  let component: PrimaryModuleComponent;
  let fixture: ComponentFixture<PrimaryModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
