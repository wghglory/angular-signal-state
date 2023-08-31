import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListRxjsComponent } from './student-list-rxjs.component';

describe('StudentListRxjsComponent', () => {
  let component: StudentListRxjsComponent;
  let fixture: ComponentFixture<StudentListRxjsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentListRxjsComponent]
    });
    fixture = TestBed.createComponent(StudentListRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
