import { Injectable } from "@angular/core";
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

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return (
        this.http
          .post<AuthResponsData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          // must pipe here instead so this effect won't die
          .pipe(
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return of(
                new AuthActions.Login({
                  email: resData.email,
                  userId: resData.localId,
                  token: resData.idToken,
                  expirationDate: expirationDate,
                })
              );
            }),
            catchError((error) => {
              // ...
              return of(); // this returns an empty observable
            })
          )
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
