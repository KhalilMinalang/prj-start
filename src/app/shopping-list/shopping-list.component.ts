import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { LogginService } from "../logging.service";
import { Observable } from "rxjs";
import * as fromShoppingList from "./store/shopping-list.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";

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
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    private store: Store<fromShoppingList.AppState>
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
    // you can always subscribe to it
    // this.ingredients = this.store.select("shoppingList").subscribe();

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit");
  }

  ngOnDestroy(): void {
    // this.igChanged.unsubscribe();
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
