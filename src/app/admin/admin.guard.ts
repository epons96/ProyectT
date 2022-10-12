import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoggedInUserService } from "../core/loggedInUser/logged-in-user.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private loggeInUser: LoggedInUserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.loggeInUser.getLoggedInUser() &&
      this.loggeInUser.getLoggedInUser().role == "admin"
    ) {
      return true;
    } else {
      this.router.navigate(["/client"]);
      return false;
    }
  }
}
