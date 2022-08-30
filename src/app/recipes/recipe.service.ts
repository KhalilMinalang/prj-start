import { Recipe } from "./recipe.model";

export class RecipeService {
  // make it private
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is simply a test",
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg"
    ),
    new Recipe(
      "Another Test Recipe",
      "This is simply a test",
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg"
    ),
  ];

  getRecipes() {
    // this will simply return a new array which is an exact copy of the one in this service file.
    return this.recipes.slice();
  }
}
