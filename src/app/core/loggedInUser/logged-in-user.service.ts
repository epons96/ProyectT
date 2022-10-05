import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoggedInUserService {
  $loggedInUserUpdated = new Subject<any>();
  $showCountDown = new Subject<any>();
  loggedInUser: any = null;
  private token!: null;

  constructor() {
    const data = this.getLoggedInUser();
    if (data) {
      this.loggedInUser = { ...data };
    }
  }

  public getLoggedInUser(): any {
    const userStorage = localStorage.getItem("u_");
    if (userStorage) {
      const decrypted = userStorage;
      return JSON.parse(decrypted);
    } else {
      return null;
    }
  }

  public setLoggedInUser(user: any) {
    if (user) {
      this.setToken(user.token);
      const dataString = JSON.stringify(user);
      const encriptedData = dataString; // TODO: this.encrDrecService.set(environment.key, dataString);
      localStorage.setItem("u_", encriptedData);
    }
    this.loggedInUser = user;
  }

  public updateUserProfile(user: any) {
    if (user) {
      this.setToken(user.token);
      this.loggedInUser = Object.assign(this.loggedInUser, user);
    } else {
      this.setToken(null);
      this.loggedInUser = null;
    }
    this.setLoggedInUser(this.loggedInUser);
    this.$loggedInUserUpdated.next(this.loggedInUser);
  }

  public setToken(token: any) {
    this.token = token;
  }

  public getTokenOfUser(): any {
    return this.token || null;
  }

  public isAdmin(): boolean {
    return this.getLoggedInUser() && this.getLoggedInUser().role === "admin";
  }

  public isClient(): boolean {
    return this.getLoggedInUser() && this.getLoggedInUser().role === "client";
  }
}
