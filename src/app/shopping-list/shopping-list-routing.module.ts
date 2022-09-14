// it's also possible to shortcut this instead since there's only 1 route
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
  {
    // path: "shopping-list",
    path: "",
    component: ShoppingListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
