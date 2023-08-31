import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClarityModule, ClrDatagridStateInterface } from '@clr/angular';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';

import { dgState } from '../shared/operators/dg-state.operator';
import { stateHandler } from '../shared/utils/datagrid.util';
import { ApiQuery } from '../shared/models/api-query';
import { api } from '../shared/operators/api.operator';
import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { Student } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-list-signal',
  standalone: true,
  imports: [CommonModule, RouterLink, ClarityModule, PageContainerComponent, AlertComponent],
  templateUrl: './student-list-signal.component.html',
  styleUrls: ['./student-list-signal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListSignalComponent {
  selectedStudent: Student | undefined;

  private dgSource = new BehaviorSubject<ClrDatagridStateInterface | null>(null);
  dgState$ = this.dgSource.pipe(dgState());

  studentService = inject(StudentService);

  $vm: Signal<ApiQuery<Student[]>> = toSignal(
    combineLatest([this.dgState$, this.studentService.refresh$]).pipe(
      switchMap(([state]) => {
        const params = stateHandler(state);
        return this.studentService.getStudentList(params).pipe(api());
      }),
    ),
    // used to trigger the first render of datagrid.
    { initialValue: { loading: true, error: null, data: null } },
  );

  $total = computed(() => this.$vm().data?.length || 0);

  refresh(state: ClrDatagridStateInterface) {
    this.dgSource.next(state);
  }
}
