import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
// import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule,
    // ShoppingListRoutingModule,
    // the shortcut
    RouterModule.forChild([
      {
        path: "shopping-list",
        component: ShoppingListComponent,
      },
    ]),
  ],
})
export class ShoppingListModule {}