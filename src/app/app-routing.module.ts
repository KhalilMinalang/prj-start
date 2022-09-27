import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    // please provide 'pathMatch' error fix
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    // old synax
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
    // modern syntax
    // loadChildren: () => import("./recipes/recipes.module").then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
    // preloadingStrategy: NoPreloading, // default setting
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
