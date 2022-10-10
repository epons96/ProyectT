import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";
import { UtilsService } from "src/app/core/utils/utils.service";
import { IPagination } from "src/app/core/interfaces/pagination.class";
import { ProductService } from "src/app/core/product/product.service";
// import { ToastrService } from "ngx-toastr";
import { BreadcrumbService } from "src/app/shared/layout/breadcrumd/service/breadcrumb.service";
import { ConfirmationDialogComponent } from "src/app/admin/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  constructor(
    private breadcrumbService: BreadcrumbService // private showToastr: ToastrService,
  ) {}

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Productos", true);

    ///////////////////////////////////////////

    ///////////////////////////////////////////
    ///////////////////////////////////////////
  }

  //////////////////////////////
}
