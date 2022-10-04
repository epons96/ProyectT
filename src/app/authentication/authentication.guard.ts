import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { LoggedInUserService } from "../core/loggedInUser/logged-in-user.service";
import { AuthenticationService } from "../core/authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loggedInUserService: LoggedInUserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAccess();
  }

  checkAccess(): boolean {
    const loggedInUser = this.loggedInUserService.getLoggedInUser();

    if (loggedInUser && loggedInUser.role) {
      if (loggedInUser.role === "admin") {
        this.router.navigate(["admin"]);
      }
      if (loggedInUser.role === "client") {
        this.router.navigate(["client"]);
      }
    } else {
      this.authenticationService.logout();
      return true;
    }
    return true;
  }
}
