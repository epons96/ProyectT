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
    private productService: ProductService
  ) {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this._unsubscribeAll = new Subject<any>();

    this.isEditing = data.isEditing;
    this.selectedProducts = data.selectedProducts;
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
      });
    } else {
      this.form = this.fb.group({
        name: [this.selectedProducts.name, [Validators.required]],
        quantity: [this.selectedProducts.quantity, [Validators.required]],
        market: [this.selectedProducts.market, [Validators.required]],
        description: [this.selectedProducts.description, []],
      });
    }
  }

  public onSave(): void {
    if (!this.isEditing) {
      let data = { ...this.form.value };
      // this.elementService.create(data)
      //   .subscribe({
      //     next: (output) => {
      //       this.showToastr.showSucces("Elemento creado correctamente");
      //       this.dialogRef.close(output?.data);
      //     },
      //     error: (error: any) => {
      //       this.isSaving = false;
      //       if (error.status === 404 || error.status === 403) {
      //         this.dialogRef.close();
      //       }
      //     },
      //   });
    } else {
      let data = { ...this.form.value };
      // this.elementService.edit(this.selectedProducts.id, data)
      //   .subscribe({
      //     next: (output) => {
      //       const data = {
      //         ConciliationId: this.selectedProducts.id,
      //         reservationIds: this.form.value.reservationIds
      //       };
      //       this.elementService.addReservations(data)
      //         .subscribe({
      //           next: (output) => {
      //             this.showToastr.showSucces(_t("Elemento editado correctamente"));
      //             this.dialogRef.close(output?.data);
      //           },
      //           error: (error: any) => {
      //             this.isSaving = false;
      //             if (error.status === 404 || error.status === 403) {
      //               this.dialogRef.close();
      //             }
      //           },
      //         });
      //       this.showToastr.showSucces("Elemento creado correctamente");
      //       this.dialogRef.close(output);
      //     },
      //     error: (error: any) => {
      //       this.isSaving = false;
      //       if (error.status === 404 || error.status === 403) {
      //         this.dialogRef.close();
      //       }
      //     },
      //   });
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
