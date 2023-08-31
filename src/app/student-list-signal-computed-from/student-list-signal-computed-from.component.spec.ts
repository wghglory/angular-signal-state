import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListSignalComputedFromComponent } from './student-list-signal-computed-from.component';

describe('StudentListSignalComputedFromComponent', () => {
  let component: StudentListSignalComputedFromComponent;
  let fixture: ComponentFixture<StudentListSignalComputedFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentListSignalComputedFromComponent]
    });
    fixture = TestBed.createComponent(StudentListSignalComputedFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
