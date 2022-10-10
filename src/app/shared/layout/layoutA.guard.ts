import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";

@Injectable({
  providedIn: "root",
})
export class LayoutAGuard implements CanActivate {
  constructor(
    private loggerInUser: LoggedInUserService,
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
      this.loggerInUser.getLoggedInUser() &&
      this.loggerInUser.getLoggedInUser().role == "admin"
    ) {
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(["/auth/login"]).then(() => false);
      return false;
    }
  }
}
