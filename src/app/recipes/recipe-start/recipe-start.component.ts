import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-start",
  templateUrl: "./recipe-start.component.html",
  styleUrls: ["./recipe-start.component.css"],
})
export class RecipeStartComponent implements OnInit {
  selectedRecipe: Recipe;

  ngOnInit(): void {}
}
