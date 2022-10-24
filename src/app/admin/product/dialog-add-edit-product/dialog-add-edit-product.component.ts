import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { ProductService } from "src/app/core/product/product.service";
import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-dialog-add-edit-product",
  templateUrl: "./dialog-add-edit-product.component.html",
  styleUrls: ["./dialog-add-edit-product.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditProductComponent implements OnInit, OnDestroy {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  form: FormGroup;
  _unsubscribeAll: Subject<any>;
  selectedProducts = null;
  public searching: boolean = false;
  public allReservations: any[];
  agencies: any[] = [];

  /////////////////////////////////////////////////

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditProductComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this._unsubscribeAll = new Subject<any>();

    this.isEditing = data.isEditing;
    this.selectedProducts = data.selectedProducts;
    console.log(data);
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    if (!this.isEditing) {
      this.form = this.fb.group({
        name: [null, [Validators.required]],
        quantity: [null, [Validators.required]],
        market: [null, [Validators.required]],
        description: [null, []],
        price: [null, [Validators.required]],
      });
    } else {
      this.form = this.fb.group({
        id: [this.selectedProducts.id],
        name: [this.selectedProducts.name, [Validators.required]],
        quantity: [this.selectedProducts.quantity, [Validators.required]],
        market: [this.selectedProducts.market, [Validators.required]],
        description: [this.selectedProducts.description, []],
        price: [this.selectedProducts.price, [Validators.required]],
      });
    }
  }

  public onSave(): void {
    if (!this.isEditing) {
      this.isSaving = true;
      let data = { ...this.form.value };
      this.productService.addProduct(data).subscribe({
        next: (output) => {
          this._snackBar.open("Elemento creado correctamente", "", {
            duration: 2000,
            panelClass: "success-snackbar",
          });
          // this.showToastr.showSucces("Elemento creado correctamente");
          this.dialogRef.close(output?.name);
          this.isSaving = false;
        },
        error: (error: any) => {
          this.isSaving = false;
          if (error.status === 404 || error.status === 403) {
            this._snackBar.open("Error al crear el elemento", "", {
              duration: 2000,
              panelClass: "error-snackbar",
            });
            this.dialogRef.close();
          }
        },
      });
    } else {
      let data = { ...this.form.value };
      console.log(data);
      console.log(this.form.value);
      data.id = this.selectedProducts.id;
      this.productService.editProduct(data).subscribe(
        (data) => {
          if (data) {
            this._snackBar.open("Elemento editado correctamente", "", {
              duration: 2000,
              panelClass: "success-snackbar",
            });
          }
          this.dialogRef.close(true);
        },
        (error: any) => {
          this.isSaving = false;
          if (error.status === 404 || error.status === 403) {
            this._snackBar.open("Error al editar el elemento", "", {
              duration: 2000,
              panelClass: "error-snackbar",
            });
            this.dialogRef.close();
          }
        }
      );
    }
  }

  displayFn(office: any): string {
    return office && office.name ? office.name : "";
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next("");
    this._unsubscribeAll.complete();
  }
}
