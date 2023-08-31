import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClarityModule, ClrDatagridStateInterface } from '@clr/angular';
import { pipe, startWith, switchMap } from 'rxjs';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { ApiQuery } from '../shared/models/api-query';
import { Student } from '../shared/models/student.model';
import { api } from '../shared/operators/api.operator';
import { dgState } from '../shared/operators/dg-state.operator';
import { StudentService } from '../shared/services/student.service';
import { stateHandler } from '../shared/utils/datagrid.util';
import { computedFrom } from '../shared/utils/compute-from';

@Component({
  selector: 'app-student-list-signal-computed-from',
  standalone: true,
  imports: [CommonModule, RouterLink, ClarityModule, PageContainerComponent, AlertComponent],
  templateUrl: './student-list-signal-computed-from.component.html',
  styleUrls: ['./student-list-signal-computed-from.component.scss'],
})
export class StudentListSignalComputedFromComponent {
  selectedStudent: Student | undefined;

  private dgSource: WritableSignal<ClrDatagridStateInterface | null> = signal(null);
  $dgState = computedFrom({ dgSource: this.dgSource }, dgState());

  studentService = inject(StudentService);

  $vm: Signal<ApiQuery<Student[]>> = computedFrom(
    [this.$dgState, this.studentService.refresh$],
    pipe(
      switchMap(([state]) => {
        const params = stateHandler(state);
        return this.studentService.getStudentList(params).pipe(api());
      }),
      // used to trigger the first render of datagrid.
      startWith({ loading: true, error: null, data: null }),
    ),
  );

  $total = computed(() => this.$vm().data?.length || 0);

  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.set(state);
  }
}
