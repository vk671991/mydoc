import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePage } from './choose.page';

describe('ChoosePage', () => {
  let component: ChoosePage;
  let fixture: ComponentFixture<ChoosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
