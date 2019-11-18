import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrDetailPage } from './drdetail.page';

describe('DrDetailPage', () => {
  let component: DrDetailPage;
  let fixture: ComponentFixture<DrDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
