import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponsData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signp(email: string, password: string) {
    return this.http.post<AuthResponsData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyA0FtYW-Kc5Wc5NQ5YwiMZ-gQlWd7ve2OM",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
