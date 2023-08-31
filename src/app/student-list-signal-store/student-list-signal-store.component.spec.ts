import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListSignalStoreComponent } from './student-list-signal-store.component';

describe('StudentListSignalStoreComponent', () => {
  let component: StudentListSignalStoreComponent;
  let fixture: ComponentFixture<StudentListSignalStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentListSignalStoreComponent]
    });
    fixture = TestBed.createComponent(StudentListSignalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
