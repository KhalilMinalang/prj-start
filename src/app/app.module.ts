import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { LogginService } from "./logging.service";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
// import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";
// import { authReducer } from "./auth/store/auth.reducer";
import * as fromApp from "./store/app.reducer";
import { AuthEffects } from "./auth/store/auth.effects";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // StoreModule.forRoot({
    //   shoppingList: shoppingListReducer,
    //   auth: authReducer,
    // }),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    CoreModule,
  ],
  providers: [LogginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
