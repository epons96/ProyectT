import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IUser } from "src/app/core/interfaces/user.class";
import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";
import { UserService } from "src/app/core/user/user.service";
import { BreadcrumbService } from "src/app/shared/layout/breadcrumd/service/breadcrumb.service";

@Component({
  selector: "app-user-layout",
  templateUrl: "./user-layout.component.html",
  styleUrls: ["./user-layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserLayoutComponent implements OnInit {
  loggedInUser: IUser = null;

  constructor(
    private userService: UserService,
    private loggedInUserService: LoggedInUserService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Usuarios del Sistema", true);
  }
}
