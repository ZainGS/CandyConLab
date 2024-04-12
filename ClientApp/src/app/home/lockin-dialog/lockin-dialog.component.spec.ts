import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockinDialogComponent } from './lockin-dialog.component';

describe('LockinDialogComponent', () => {
  let component: LockinDialogComponent;
  let fixture: ComponentFixture<LockinDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockinDialogComponent]
    });
    fixture = TestBed.createComponent(LockinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
