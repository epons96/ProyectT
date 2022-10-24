import { ConfirmationDialogModule } from "../../shared/confirmation-dialog/confirmation-dialog.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
////////// --------MATERIAL MODULES------- /////////////////////////
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { ProductTableComponent } from "./product-table/product-table.component";
import { DialogAddEditProductComponent } from "./dialog-add-edit-product/dialog-add-edit-product.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { DialogShowProductComponent } from "./dialog-show-product/dialog-show-product.component";
import { ProductRoutingModule } from "./product-routing.module";
import { BasicSnackbarModule } from "src/app/shared/basic-snackbar/basic-snackbar.module";
///////////////////////////////////////////////////////////////////

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    ProductRoutingModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ConfirmationDialogModule,
    BasicSnackbarModule,
  ],
  declarations: [
    ProductTableComponent,
    DialogAddEditProductComponent,
    DialogShowProductComponent,
  ],
})
export class ProducstModule {}
