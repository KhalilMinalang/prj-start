import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LogginService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-complete-guide-update';

  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LogginService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
