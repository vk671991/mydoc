import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { HowitworkPage } from './howitwork.page';

describe('HowitworkPage', () => {
  let component: HowitworkPage;
  let fixture: ComponentFixture<HowitworkPage>;
  let HowitworkPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowitworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(HowitworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    HowitworkPage = fixture.nativeElement;
    const items = HowitworkPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
