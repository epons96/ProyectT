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
import { BreadcrumbService } from "../../layout/breadcrumd/service/breadcrumb.service";
import { ConfirmationDialogComponent } from "../../confirmation-dialog/confirmation-dialog.component";
import { IPagination } from "src/app/core/interfaces/pagination.class";
import { ProductService } from "src/app/core/product/product.service";
// import { ToastrService } from "ngx-toastr";
import { DialogShowProductComponent } from "../dialog-show-product/dialog-show-product.component";
import { DialogAddEditProductComponent } from "../dialog-add-edit-product/dialog-add-edit-product.component";

@Component({
  selector: "app-product",
  templateUrl: "./product-table.component.html",
  styleUrls: ["./product-table.component.scss"],
})
export class ProductTableComponent implements OnInit, OnDestroy {
  allProducts: any[] = [];
  searchForm: FormGroup;
  formFilters: FormGroup;
  dateRangeForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  showFilterConciliate: boolean;
  loggedInUser: any;
  loading = false;
  _unsubscribeAll: Subject<any>;
  selection: SelectionModel<any>;
  imageUrl: any;
  showActionsBtn = false;
  initialPage = 10;
  pageSizeOptions: number[] = [this.initialPage, 25, 100, 1000];
  searchElementCount = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading = false;
  query: IPagination = {
    limit: this.initialPage,
    offset: 0,
    total: 0,
    page: 0,
    order: "id",
    filter: {
      filterText: "",
      properties: [],
    },
  };

  displayedColumns: string[] = [
    "select",
    "name",
    "quantity",
    "market",
    "actions",
  ];
  displayedColumnsFilters: string[] = [
    "selectF",
    "nameF",
    "quantityF",
    "marketF",
    "actionsF",
  ];

  constructor(
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
    private breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
    public utilsService: UtilsService,
    // private showToastr: ToastrService,
    private productService: ProductService
  ) {
    this._unsubscribeAll = new Subject<any>();
    this.dataSource = new MatTableDataSource([]);
    this.selection = new SelectionModel<any>(true, []);
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.imageUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.createSearchForm();
    this.refreshData();

    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Productos", true);

    ///////////////////////////////////////////

    this.searchForm.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        distinctUntilChanged(),
        debounceTime(250)
      )
      .subscribe((val: any) => {
        if (val.textCtrl.length !== 0) {
          if (val.textCtrl.toString().trim() !== "") {
            this.refreshData();
            this.paginator.firstPage();
          }
        } else {
          this.query = {
            limit: this.initialPage,
            offset: 0,
            total: 0,
            page: 0,
            order: this.query.order || "id",
            filter: {
              filterText: "",
            },
          };
          this.refreshData();
          this.paginator.firstPage();
        }
      });

    this.formFilters.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      this.refreshData();
      this.paginator.firstPage();
    });
    ///////////////////////////////////////////
    ///////////////////////////////////////////
  }

  ngOnDestroy() {
    this._unsubscribeAll.next("");
    this._unsubscribeAll.complete();
  }

  refreshData(): void {
    this.isLoading = true;
    const searchvalue = this.searchForm.controls["textCtrl"].value;
    if (searchvalue && searchvalue !== "") {
      this.query.filter.filterText = searchvalue.toString().trim();
      this.query.filter.properties = [];

      this.query.filter.properties.push("filter[$or][quantity][$like]");
      this.query.filter.properties.push("filter[$or][market][$like]");
    } else {
      this.query.filter.filterText = "";
    }
    const searchFilter = this.formFilters.value;
    this.productService.getAllProducts(this.query, searchFilter).subscribe(
      (data) => {
        this.initTable(data.data);
        console.log(data);
        this.query.total = data.meta.pagination.total;
        this.selection.clear();
        this.isLoading = false;
      },
      (error) => {
        this.selection.clear();
        this.isLoading = false;
      }
    );
  }

  initTable(data) {
    this.allProducts = data;
    this.dataSource = new MatTableDataSource(data);
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      textCtrl: ["", [Validators.required]],
    });
    this.formFilters = this.fb.group({
      user: [null, []],
    });
    this.dateRangeForm = this.fb.group({
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
    });
  }

  showSearchForm() {
    this.showFilterConciliate = true;
  }

  hideSearchForm() {
    this.showFilterConciliate = false;
    this.searchForm.controls["textCtrl"].setValue("");
  }

  //////////////////// Pagination Api ////////////////////////////
  OnPaginatorChange(event) {
    console.log(event);
    if (event) {
      this.query.limit = event.pageSize || this.initialPage;
      this.query.offset = event.pageIndex * event.pageSize;
      this.query.page = event.pageIndex;
    } else {
      this.query.limit = this.initialPage;
      this.query.offset = 0;
      this.query.page = 1;
    }
    this.refreshData();
  }

  /////////////////////////////////////
  /////// Select logic/////////////////

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  //////////////////////////////

  onCreateProduct(): void {
    let dialogRef: MatDialogRef<DialogAddEditProductComponent, any>;
    dialogRef = this.dialog.open(DialogAddEditProductComponent, {
      panelClass: "app-dialog-add-edit-product",
      maxWidth: "100vw",
      maxHeight: "100vh",
      data: {
        isEditing: false,
        selectedConciliation: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshData();
    });
  }

  onEditProduct(conciliation): void {
    this.productService.getProduct(conciliation.id).subscribe((data) => {
      let dialogRef: MatDialogRef<DialogAddEditProductComponent, any>;
      dialogRef = this.dialog.open(DialogAddEditProductComponent, {
        panelClass: "app-dialog-add-edit-product",
        maxWidth: "100vw",
        maxHeight: "100vh",
        data: {
          isEditing: true,
          selectedConciliation: conciliation,
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.refreshData();
      });
    });
  }

  async onRemoveConicliation(elements) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "450px",
      data: {
        title: "Confirmación",
        question: "Estas seguro de eliminar este(os) elemento(s)?",
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      try {
        if (result) {
          const data = await Promise.all(
            elements.map((item) =>
              this.productService.removeProduct(item).toPromise()
            )
          );
          // this.showToastr.success(
          //   "Elementos correctamente eliminados",
          //   "Éxito"
          // );
          this.refreshData();
        }
      } catch (error) {
        this.refreshData();
      }
    });
  }

  onConciliationDetails(conciliation): void {
    this.productService.getProduct(conciliation.id).subscribe((data) => {
      const dialogRef = this.dialog.open(DialogShowProductComponent, {
        panelClass: "app-dialog-add-edit-conciliate",
        maxWidth: "100vw",
        maxHeight: "100vh",
        data: {
          selectedConciliation: data,
          urlImage: null,
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.refreshData();
      });
    });
  }

  sortData(event) {
    console.log(event, "sort");
    let value = event.active;
    value = event.direction == "desc" ? `-${value}` : `${value}`;
    this.query.order = value;
    this.refreshData();
  }
}
