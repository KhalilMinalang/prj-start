import { Actions, ofType, Effect } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

import * as AuthActions from "./auth.actions";

export interface AuthResponsData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return (
        this.http
          .post<AuthResponsData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          // must pipe here instead so this effect won't die
          .pipe(
            catchError((error) => {
              //
              of();
            }),
            map((resData) => {
              //
              of();
            })
          )
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
