import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseImagePage } from './chooseimage.page';

describe('ChooseImagePage', () => {
  let component: ChooseImagePage;
  let fixture: ComponentFixture<ChooseImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
