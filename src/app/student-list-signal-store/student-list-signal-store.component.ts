import { Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClarityModule, ClrDatagridStateInterface } from '@clr/angular';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { Student } from '../shared/models/student.model';

import { StudentListStore } from './student-list.store';
import { SelectedStudentComponent } from '../shared/components/selected-student/selected-student.component';

@Component({
  selector: 'app-student-list-signal-store',
  standalone: true,
  imports: [CommonModule, RouterLink, ClarityModule, PageContainerComponent, AlertComponent, SelectedStudentComponent],
  templateUrl: './student-list-signal-store.component.html',
  styleUrls: ['./student-list-signal-store.component.scss'],
  providers: [StudentListStore],
})
export class StudentListSignalStoreComponent {
  selectedStudent: Student | undefined = undefined;

  protected readonly store = inject(StudentListStore);

  $total = computed(() => this.store.$students()?.length || 0);

  refresh(state: ClrDatagridStateInterface | null) {
    this.store.getStudents(state);
  }
}
