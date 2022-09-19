import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { take } from "rxjs/operators";

import { Recipe } from "./recipe.model";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipe.actions";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    // private dataStorageService: DataStorageService,
    // private recipesService: RecipeService
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  // old code
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const recipes = this.recipesService.getRecipes();
  //   if (recipes.length === 0) {
  //     return this.dataStorageService.fetchRecipes();
  //   } else {
  //     return recipes;
  //   }
  // }
  // new code
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchRecipes();
    this.store.dispatch(new RecipesActions.FetchRecipes());
    return this.actions$.pipe(
      //
      ofType(RecipesActions.SET_RECIPES),
      take(1)
    );
  }
}
