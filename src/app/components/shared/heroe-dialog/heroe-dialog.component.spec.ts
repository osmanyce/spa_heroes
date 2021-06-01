import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeDialogComponent } from './heroe-dialog.component';

describe('HeroeDialogComponent', () => {
  let component: HeroeDialogComponent;
  let fixture: ComponentFixture<HeroeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
