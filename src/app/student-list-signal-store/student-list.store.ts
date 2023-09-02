import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, of, switchMap, tap } from 'rxjs';
import { AppStore } from '../app.store';
import { createEffect } from '../shared/utils/create-effect';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../shared/models/student.model';
import { stateHandler } from '../shared/utils/datagrid.util';
import { StudentService } from '../shared/services/student.service';
import { ClrDatagridStateInterface } from '@clr/angular';

/**
 * Feature Store or Local Store

 * Feature store: The root component (or a route) of the feature should "provide" this store. Do not add this store to the providers of descendant components, otherwise, they will create their own, local instances of the feature store, and it will lead to unpleasant bugs.

 * Local store: Pretty similar to a feature store, the component should provide this store to itself
 */
@Injectable()
export class StudentListStore {
  studentService = inject(StudentService);

  // Can inject Global store into component store
  private readonly appStore = inject(AppStore);

  private readonly state = {
    $loading: signal<boolean>(false),
    $error: signal<HttpErrorResponse | null>(null),
    $students: signal<Student[]>([]),
    $dgState: signal<ClrDatagridStateInterface | null>(null),
  } as const;

  readonly $loading = this.state.$loading.asReadonly();
  readonly $error = this.state.$error.asReadonly();
  readonly $students = this.state.$students.asReadonly();
  readonly $dgState = this.state.$dgState.asReadonly();

  readonly getStudents = createEffect<ClrDatagridStateInterface | null>(_ =>
    _.pipe(
      tap(() => this.setLoading()),
      switchMap(state => {
        this.state.$dgState.set(state);
        const params = stateHandler(state);

        return this.studentService.getStudentList(params).pipe(
          tap(data => this.setData(data)),
          catchError(err => {
            this.setError(err);
            return EMPTY;
          }),
        );
      }),
    ),
  );

  readonly setLoading = () => {
    this.state.$loading.set(true);
    this.state.$error.set(null);
  };

  readonly setData = (data: Student[]) => {
    this.state.$loading.set(false);
    this.state.$students.set(data);
  };

  readonly setError = (err: HttpErrorResponse) => {
    this.state.$loading.set(false);
    this.state.$error.set(err);
  };
}
