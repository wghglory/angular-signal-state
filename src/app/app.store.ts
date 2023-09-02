import { Injectable, computed, signal } from '@angular/core';
import { EMPTY, concatMap, finalize, tap, timer } from 'rxjs';
import { createEffect } from './shared/utils/create-effect';
import { User } from './shared/models/user.model';

/* Global Store
  add this decorator: @Injectable({ providedIn: 'root' })
 */

@Injectable({ providedIn: 'root' })
export class AppStore {
  private readonly state = {
    $isDarkTheme: signal<boolean>(false),
    $currentUser: signal<User | undefined>(undefined),
    $loadingCurrentUser: signal<boolean>(false),
  } as const;

  public readonly $isDarkTheme = this.state.$isDarkTheme.asReadonly();
  public readonly $currentUser = this.state.$currentUser.asReadonly();
  public readonly $loadingCurrentUser = this.state.$loadingCurrentUser.asReadonly();
  public readonly $theme = computed(() => (this.state.$isDarkTheme() ? 'dark' : 'light'));

  constructor() {
    // Optional
    this.setIsDark(true);
    this.getCurrentUser();
  }

  setIsDark = createEffect<boolean>(isDark$ =>
    isDark$.pipe(
      concatMap(isDark => {
        this.state.$isDarkTheme.set(isDark);
        return EMPTY;
      }),
    ),
  );

  private getCurrentUser = createEffect(_ =>
    _.pipe(
      concatMap(() => {
        this.state.$loadingCurrentUser.set(true);

        // simulate /current-user API call
        return timer(3000).pipe(
          finalize(() => this.state.$loadingCurrentUser.set(false)),
          tap(() => this.state.$currentUser.set({ name: 'Derek' })),
        );
      }),
    ),
  );
}
