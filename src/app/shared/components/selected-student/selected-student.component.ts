import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';
import { StudentListStore } from 'src/app/student-list-signal-store/student-list.store';

@Component({
  selector: 'app-selected-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-student.component.html',
  styleUrls: ['./selected-student.component.scss'],
})
export class SelectedStudentComponent {
  // No need to provide store since parent did it.
  protected readonly store = inject(StudentListStore);

  $name = signal('');

  @Input({ required: true }) set student(item: Student) {
    this.$name.set(`${item.firstName} ${item.lastName}`);
  }
}
