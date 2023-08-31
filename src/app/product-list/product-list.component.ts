import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStore } from '../app.store';
import { PageContainerComponent } from '../shared/components/page-container/page-container.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, PageContainerComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  protected readonly store = inject(AppStore);

  changeUser() {}

  toggleDarkTheme() {
    this.store.setIsDark(!this.store.$isDarkTheme());
  }
}
