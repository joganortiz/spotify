import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisotryPageComponent } from './hisotry-page.component';

describe('HisotryPageComponent', () => {
  let component: HisotryPageComponent;
  let fixture: ComponentFixture<HisotryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisotryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HisotryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
