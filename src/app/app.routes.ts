import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { StudentListRxjsComponent } from './student-list-rxjs/student-list-rxjs.component';
import { StudentListSignalComponent } from './student-list-signal/student-list-signal.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'student-list-rxjs',
    component: StudentListRxjsComponent,
  },
  {
    path: 'student-list-signal',
    component: StudentListSignalComponent,
  },
  {
    path: 'student-list-signal-computed-from',
    component: StudentListSignalComponent,
  },
];
