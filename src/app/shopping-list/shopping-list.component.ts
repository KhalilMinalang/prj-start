import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { LogginService } from "../logging.service";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChanged: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LogginService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChanged = this.slService.ingredientIsChanged.subscribe(
      // this.igChanged = this.slService.subscription.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit");
  }

  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
