import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user.class";

@Injectable({
  providedIn: "root",
})
export class UserResolverService {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser> {
    return this.userService.getAllUsers();
  }
}
