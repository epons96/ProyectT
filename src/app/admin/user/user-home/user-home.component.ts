import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectionModel } from "@angular/cdk/collections";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
// import { ToastrService } from "ngx-toastr";
import { DialogUserTableAddEditComponent } from "../dialog-user-table-add-edit/dialog-user-table-add-edit.component";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { IUser } from "src/app/core/interfaces/user.class";
import { LoggedInUserService } from "../../../core/loggedInUser/logged-in-user.service";
import { UserService } from "src/app/core/user/user.service";
import { ConfirmationDialogComponent } from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import { BreadcrumbService } from "src/app/shared/layout/breadcrumd/service/breadcrumb.service";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserHomeComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<IUser>([]);
  // @HostBinding('attr.class') cssClass = 'cf-margin-20';
  @Input() data: any;
  @Input() role: any;

  // if tab are disability users
  @Input() disability: boolean;

  innerWidth: any;
  applyStyle = false;
  pageSizeOptions: number[] = [10, 15, 25];
  displayedUserColumns = ["select", "username", "role"];
  searchForm: FormGroup;
  dataSourceUser = new MatTableDataSource<IUser>([]);
  selection = new SelectionModel<IUser>(true, []);
  allUsers: any[] = [];
  selectedUserId: number;
  showFilterUser: boolean;
  loggedInUser: IUser;
  destroyed$ = new Subject();
  refreshDataLogedUser: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    // private toastr: ToastrService,
    private loggedInUserService: LoggedInUserService,
    private breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
    // private showToastrService: ToastrService,
    private userService: UserService
  ) {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.createSearchForm();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Usuarios del Sistema", true);
    this.onRefreshData();

    this.refreshDataLogedUser =
      this.loggedInUserService.$loggedInUserUpdated.subscribe((data) => {
        this.onRefreshData();
      });

    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe((val) => {
      this.filterUsersByName(val.textCtrl);
      // const data = this.filterUsersByName(val.textCtrl);
      // this.dataSourceUser = new MatTableDataSource<IUser>(data);
      // this.dataSourceUser.paginator = this.paginator;
      // this.dataSourceUser.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next("");
    this.destroyed$.complete();
    this.refreshDataLogedUser.unsubscribe();
  }

  filterUsersByName(name: string) {
    let params = {
      username: name,
      name: name,
      role: name,
      lastname: name,
      phone: name,
      email: name,
    };

    this.onRefreshData(params);

    // return this.allUsers.filter(
    //   (user) =>
    //     user.username.toLowerCase().indexOf(name.toLowerCase()) >= 0 ||
    //     user.role.toLowerCase().indexOf(name.toLowerCase()) >= 0 ||
    //     (user.name && user.name.toLowerCase().indexOf(name.toLowerCase()) >= 0) ||
    //     (user.lastname && user.lastname.toLowerCase().indexOf(name.toLowerCase()) >= 0) ||
    //     (user.cellphone && user.cellphone.toLowerCase().indexOf(name.toLowerCase()) >= 0) ||
    //     (user.email && user.email.toLowerCase().indexOf(name.toLowerCase()) >= 0),
    // );
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 600) {
      this.applyStyle = false;
    } else {
      this.applyStyle = true;
    }
  }

  onRefreshData(params?) {
    this.selectedUserId = null;
    this.selection.clear();
    if (this.role !== "any") {
      // role: this.role,
      this.userService.getAllUsers({ limit: 0, offset: 0 }).subscribe((val) => {
        this.onInitTable(val);
      });
    }
  }

  onInitTable(data: any) {
    if (data?.length > 25) {
      this.pageSizeOptions = [10, 15, 25, data?.length];
    } else {
      this.pageSizeOptions = [10, 15, 25];
    }

    this.allUsers = data;
    this.dataSourceUser = new MatTableDataSource<any>(data);
    this.dataSourceUser.paginator = this.paginator;
    this.dataSourceUser.sort = this.sort;
  }

  masterToggle(row) {
    this.selection.clear();
    if (this.selectedUserId !== row.id) {
      this.selectedUserId = row.id;
      this.selection.select(row);
    } else {
      this.selectedUserId = null;
    }
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      textCtrl: ["", [Validators.required]],
    });
  }

  showSearchForm() {
    this.showFilterUser = true;
  }

  hideSearchForm() {
    this.showFilterUser = false;
    this.searchForm.controls["textCtrl"].setValue("");
  }

  // importDialogUserTableAddEditModule(): void {
  //   import('src/app/user/dialog-user-table-add-edit/dialog-user-table-add-edit.module')
  //     .then((m) => m.DialogUserTableAddEditModule);
  // }

  onCreateUser(): void {
    // this.importDialogUserTableAddEditModule();
    const dialogRef = this.dialog.open(DialogUserTableAddEditComponent, {
      width: this.applyStyle ? "100vw" : "16cm",
      data: {
        isEditing: false,
        user: null,
        allUser: this.allUsers,
        reserva: false,
        role: this.role,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onRefreshData();
      }
    });
  }

  onEditUser(): void {
    // this.importDialogUserTableAddEditModule();
    this.userService.getUser(this.selection.selected[0]).subscribe(
      (data) => {
        let dialogRef: MatDialogRef<DialogUserTableAddEditComponent, any>;
        dialogRef = this.dialog.open(DialogUserTableAddEditComponent, {
          width: this.applyStyle ? "100vw" : "16cm",
          data: {
            isEditing: true,
            user: data,
            allUser: this.allUsers,
            reserva: false,
            role: this.role,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.onRefreshData();
          }
        });
      },
      (error) => {
        // this.showToastrService.error("Error pidiendo usuario por id");
      }
    );
  }

  // importConfirmationDialogModule(): void {
  //   import('src/app/shared/common-dialogs/confirmation-dialog/confirmation-dialog.module')
  //     .then((m) => m.ConfirmationDialogModule);
  // }

  onRemoveUser(): void {
    // this.importConfirmationDialogModule();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "450px",
      data: {
        title: "Confirmación",
        question: "¿Está seguro que desea eliminar el usuario?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.allUsers.forEach((value) => {
          if (value.id === this.selection.selected[0].id) {
            this.userService.removeUser(value).subscribe(
              (dataShare) => {
                this.successHandle(dataShare);
                return true;
              },
              (error) => {
                this.errorHandle(error);
              }
            );
          }
        });
      }
    });
  }

  // public onEnableUser(): void {
  //   const data = {
  //     enable: true,
  //     status: 'enabled',
  //     id: this.selection.selected[0].id
  //   };

  //   // this.importConfirmationDialogModule();
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '450px',
  //     data: {
  //       title: 'Confirmación',
  //       question: '¿Está seguro que desea habilitar el usuario?',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {

  //       this.userService.editUser(data).subscribe(
  //         (response) => {
  //           this.toastr.success('El Usuario ha sido modificado con éxito.', 'Felicidades!', {
  //             timeOut: 2000,
  //             progressBar: true,
  //             positionClass: 'toast-bottom-right',
  //           });
  //           this.onRefreshData();
  //         },
  //         (error) => {
  //           this.toastr.error('No se pude habilitar el usuario seleccionado', 'Error', {
  //             timeOut: 2000,
  //             progressBar: true,
  //             positionClass: 'toast-bottom-right',
  //           });
  //         },
  //       );
  //     }
  //   });

  // }

  successHandle(data) {
    this.onRefreshData();
    // this.toastr.success(
    //   "El usuario ha sido eliminado con éxito.",
    //   "Felicidades!",
    //   {
    //     timeOut: 5000,
    //     progressBar: true,
    //     positionClass: "toast-bottom-right",
    //   }
    // );
  }

  errorHandle(error) {
    const message = error.error.message
      ? error.error.message
      : "Ha ocurrido un error.";
    // this.toastr.error(message, "Error!", {
    //   timeOut: 5000,
    //   progressBar: true,
    //   positionClass: "toast-bottom-right",
    // });
  }
}
