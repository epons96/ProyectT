import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";
import { IUser } from "../../core/interfaces/user.class";
import { BreadcrumbService } from "./breadcrumd/service/breadcrumb.service";
import { AuthenticationService } from "../../core/authentication/authentication.service";
import { DialogUserTableAddEditComponent } from "src/app/admin/user/dialog-user-table-add-edit/dialog-user-table-add-edit.component";
import { ITask } from "../../core/interfaces/task.class";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.state";
import { Store } from "@ngrx/store";
import { CartService } from "../../core/cart/cart.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  isHandset = false;
  loggedInUser: IUser;
  compressSidnavState = false;
  public sidenav: MatSidenav;
  public breadcrumb: string;
  public separator = "/";
  applyStyle = false;

  tasks: Observable<ITask[]>;
  taskss: any[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private loggedInUserService: LoggedInUserService,
    private breadcrumbService: BreadcrumbService,
    private authService: AuthenticationService,
    private cartService: CartService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    this.tasks = this.store.select("tasks");
  }

  logout(): void {
    this.authService.setLogout();
  }

  onEditUser(): void {
    let dialogRef: MatDialogRef<DialogUserTableAddEditComponent, any>;
    dialogRef = this.dialog.open(DialogUserTableAddEditComponent, {
      width: this.applyStyle ? "100vw" : "15cm",
      data: {
        isEditing: true,
        user: { ...this.loggedInUser },
        geoData: null,
        allUser: null,
        isPerfil: true,
        reserva: false,
        role: this.loggedInUser.role + "",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.onRefreshData();
      }
    });
  }

  ngOnInit(): void {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.breadcrumInActionInAction();
  }

  onMouseEnterSidenav(event) {
    if (this.compressSidnavState) {
      const sidenavId = document.querySelector("#sidenavId");
      const sidenavContentId = document.querySelector("#sidenavContentId");
      sidenavId.classList.remove("compressSidnav");
      sidenavContentId.classList.remove("expandSidnavContent");
    }
  }

  onMouseLeaveSidenav(event) {
    if (this.compressSidnavState) {
      const sidenavId = document.querySelector("#sidenavId");
      const sidenavContentId = document.querySelector("#sidenavContentId");
      sidenavId.classList.add("compressSidnav");
      sidenavContentId.classList.add("expandSidnavContent");
    }
  }

  private breadcrumInActionInAction(): void {
    this.router.events.subscribe((response: any) => {
      if (response?.snapshot?.data?.breadcrumb) {
        this.breadcrumb = response?.snapshot?.data?.breadcrumb;
        this.breadcrumbService.clearBreadcrumd();
        this.breadcrumbService.setBreadcrumd(this.breadcrumb, true);
      }
    });
  }

  getcartProducts() {
    this.cartService.getCart().subscribe((data) => {
      if (data) {
        this.taskss = data;
        console.log(this.taskss);
        this.ref.markForCheck();
      }
    });
  }
}
