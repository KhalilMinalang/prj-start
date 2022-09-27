import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";

import * as RecipesActions from "../store/recipe.actions";
import { Recipe } from "../recipe.model";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {
  
  fetchRecipes = createEffect(() => this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://ng-course-recipe-book-9aa82-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  ));

  
  storeRecipes = createEffect(() => this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([actionData, recipeState]) => {
      // this is an example of array destructuring
      return this.http.put(
        "https://ng-course-recipe-book-9aa82-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
        recipeState.recipes
      );
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
