import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { LogginService } from "../logging.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // before
  // ingredients: Ingredient[];
  // using ngrx
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChanged: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LogginService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    // this.ingredients = this.slService.getIngredients();
    // this.igChanged = this.slService.ingredientIsChanged.subscribe(
    //   // this.igChanged = this.slService.subscription.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.ingredients = this.store.select("shoppingList");

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit");
  }

  ngOnDestroy(): void {
    // this.igChanged.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
