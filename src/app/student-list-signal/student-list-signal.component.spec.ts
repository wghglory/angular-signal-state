import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListSignalComponent } from './student-list-signal.component';

describe('StudentListSignalComponent', () => {
  let component: StudentListSignalComponent;
  let fixture: ComponentFixture<StudentListSignalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentListSignalComponent]
    });
    fixture = TestBed.createComponent(StudentListSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
