import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocListPage } from './doclist.page';

describe('DocListPage', () => {
  let component: DocListPage;
  let fixture: ComponentFixture<DocListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
