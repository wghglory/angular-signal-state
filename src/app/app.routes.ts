import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { StudentListRxjsComponent } from './student-list-rxjs/student-list-rxjs.component';

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
];
