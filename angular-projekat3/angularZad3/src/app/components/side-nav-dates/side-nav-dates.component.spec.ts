import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavDatesComponent } from './side-nav-dates.component';

describe('SideNavDatesComponent', () => {
  let component: SideNavDatesComponent;
  let fixture: ComponentFixture<SideNavDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
