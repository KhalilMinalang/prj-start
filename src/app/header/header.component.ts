import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})

// a component is just a header class
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe((user) => {
    this.userSub = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        // old way
        // this.isAuthenticated = !user ? false : true;
        // new way
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
}
