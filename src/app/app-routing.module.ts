import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    // please provide 'pathMatch' error fix
    pathMatch: "full",
  },
  {
    path: "recipes",
    // old synax
    loadChildren: "./recipes/recipes.module#RecipesModule",
    // modern syntax
    // loadChildren: () => import("./recipes/recipes.module").then((m) => m.RecipesModule),
  },
  {
    path: "shopping-list",
    loadChildren: "./shopping-list/shopping-list.module#ShoppingListModule",
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
