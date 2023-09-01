import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { Subject, catchError, map, of, scan, share, startWith, switchMap, timer } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { PageContainerComponent } from '../shared/components/page-container/page-container.component';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { ApiQuery } from '../shared/models/api-query';
import { switchMapWithLoading } from '../shared/operators/switchmap-with-loading.operator';
import { api } from '../shared/operators/api.operator';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClarityModule, PageContainerComponent, SpinnerComponent, AlertComponent],
  templateUrl: './student-search.component.html',
})
export class StudentSearchComponent {
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  // search$ = this.searchForm.controls.search.valueChanges.pipe(
  //   switchMap(value =>
  //     this.http.get<{ results: any }>(`https://randomuser.me/api?results=10`).pipe(
  //       map(data => ({ data, loading: false, error: null })),
  //       catchError(error => of({ error, loading: false, data: null })),
  //       startWith({ error: null, loading: true, data: null }),
  //     ),
  //   ),
  //   scan((state: ApiQuery<{ results: any }>, change: ApiQuery<{ results: any }>) => ({
  //     ...state,
  //     ...change,
  //   })),
  // );

  search$ = this.searchForm.controls.search.valueChanges.pipe(
    switchMapWithLoading(value => this.http.get<{ results: any }>(`https://randomuser.me/api?results=10`)),
  );

  saveAction = new Subject<void>();
  saveAction$ = this.saveAction.pipe(
    // switchMapWithLoading = switchMap + api
    switchMapWithLoading(() => {
      // This could be a POST request in real world
      const payload = this.searchForm.value;
      return this.http.get<{ results: any }>(`https://randomuser.me/api?results=10`);
    }),
    // switchMap(() => {
    //   // This could be a POST request in real world
    //   const payload = this.searchForm.value;
    //   return this.http.get<{ results: any }>(`https://randomuser.me/api?results=10`).pipe(api());
    // }),
    share(),
  );

  $saveAction = toSignal(
    this.saveAction.pipe(
      switchMapWithLoading(() => {
        // This could be a POST request in real world
        const payload = this.searchForm.value;
        return this.http.get<{ results: any }>(`https://randomuser.me/api?results=10`);
      }),
    ),
    { initialValue: { loading: false, error: null, data: null } },
  );

  private http = inject(HttpClient);

  save() {
    this.saveAction.next();
  }
}
