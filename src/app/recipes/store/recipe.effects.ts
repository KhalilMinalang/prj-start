import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import * as RecipesActions from "../store/recipe.actions";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
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
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
