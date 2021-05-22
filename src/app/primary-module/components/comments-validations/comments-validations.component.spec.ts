import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsValidationsComponent } from './comments-validations.component';

describe('CommentsValidationsComponent', () => {
  let component: CommentsValidationsComponent;
  let fixture: ComponentFixture<CommentsValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
