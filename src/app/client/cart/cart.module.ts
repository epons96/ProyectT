import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ConfirmationDialogModule } from "../../shared/confirmation-dialog/confirmation-dialog.module";
import { BasicSnackbarModule } from "../../shared/basic-snackbar/basic-snackbar.module";

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    ConfirmationDialogModule,
    BasicSnackbarModule,
  ],
})
export class CartModule {}
