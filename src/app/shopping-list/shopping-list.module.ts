import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
// import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { LogginService } from "../logging.service";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    FormsModule,
    // RouterModule,
    // ShoppingListRoutingModule,
    // the shortcut
    RouterModule.forChild([
      {
        // path: "shopping-list",
        path: "",
        component: ShoppingListComponent,
      },
    ]),
    SharedModule,
  ],
  // providers: [LogginService],
})
export class ShoppingListModule {}
