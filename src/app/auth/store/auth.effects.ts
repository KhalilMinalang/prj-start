import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
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

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};
const handleError = (errorRes: any) => {
  let errorMessage = "An unknown error occurred!";
  if (!errorRes.error || !errorRes.error.error) {
    // of() returns an argument as observable
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "This email exists already";
      break;
    case "EMAIL_NOT_FOUND":
      errorMessage = "This email does not exist.";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "This password is not correct";
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      console.log("SignupStart call effect");
      return this.http
        .post<AuthResponsData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            environment.firebaseAPIKey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            console.log("ok");
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError((errorRes) => {
            console.log("err");
            return handleError(errorRes);
          })
        );
    })
  );

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
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          )
      );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(
      AuthActions.AUTHENTICATE_SUCCESS,
      // you can react to multiple actions
      AuthActions.LOGOUT
    ),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
