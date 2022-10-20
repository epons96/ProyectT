import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { HttpHeaders } from "@angular/common/http";

import { LoggedInUserService } from "../loggedInUser/logged-in-user.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userUrl = environment.apiUrl + "users";
  loginUrl = environment.apiUrl + "login";
  loginUrlC = environment.apiUrl + "loginC";
  adminProfile = environment.apiUrl + "adminProfile";
  clientProfile = environment.apiUrl + "clientProfile";
  userLogout = environment.apiUrl + "auth/logout";
  urlForgot = environment.apiUrl + "auth/forgot";
  urlChangePass = environment.apiUrl + "auth/change-pass";

  urlUserSignUp = environment.apiUrl + "register";
  userUrlLocal = environment + "auth/login";
  userLogoutLocal = environment + "auth/logout";
  urlForgotLocal = environment + "auth/forgot";
  urlChangePassLocal = environment + "auth/change-pass";

  constructor(
    private httpClient: HttpClient,
    private loggedInUserService: LoggedInUserService,
    private router: Router
  ) {}

  login(user: string, password: string) {
    const base64EncodedPw = btoa(user + ":" + password);
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Authorization: "Basic " + base64EncodedPw,
    //   }),
    //   username: user,
    //   password: password,
    // };
    const authenticate = {
      username: user,
      password: password,
    };
    return this.httpClient.post<any>(this.loginUrl, authenticate);
  }

  // LOGIN FOR CLIENT
  loginC(user: string, password: string) {
    const base64EncodedPw = btoa(user + ":" + password);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Basic " + base64EncodedPw,
      }),
      username: user,
      password: password,
    };
    return this.httpClient.get<any>(this.loginUrlC, httpOptions);
  }

  getProfile(): Observable<any> {
    return this.httpClient.get(this.adminProfile);
  }

  getProfileC(): Observable<any> {
    return this.httpClient.get(this.clientProfile);
  }

  setLogout(): void {
    this.logout().subscribe(
      () => {
        this.clearStorage();
      },
      () => {
        this.clearStorage();
      }
    );
  }

  passForgot(body: any): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("email", body.email);
    return this.httpClient.get<any>(this.urlForgot, { params: httpParams });
  }

  changePass(body: any): Observable<any> {
    return this.httpClient.post<any>(this.urlChangePass, body);
  }

  clearStorage() {
    this.removeCookies();
    localStorage.removeItem("u_");
    this.loggedInUserService.setLoggedInUser(null);
    localStorage.clear();
    this.router.navigate(["/auth"]).then((r) => false);
  }

  removeCookies() {
    const res = document.cookie;
    const multiple = res.split(";");
    for (let i = 0; i < multiple.length; i++) {
      const key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
  }

  logout(): Observable<any> {
    return this.httpClient.get(this.userLogout);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem("u_") || "[]");
  }

  public signUp(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        language: "es",
      }),
    };
    return this.httpClient.post<any>(this.urlUserSignUp, data, httpOptions);
  }
}
