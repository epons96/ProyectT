import { NgModule } from "@angular/core";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [MatDialogModule, FlexLayoutModule, MatButtonModule],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
