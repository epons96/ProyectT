import { NgModule } from "@angular/core";
import { DialogClientAddEditComponent } from "./dialog-client-add-edit.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { NgpImagePickerModule } from "ngp-image-picker";

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule,
    NgpImagePickerModule,
    // GuachosImagePickerModule,
  ],
  declarations: [DialogClientAddEditComponent],
  exports: [DialogClientAddEditComponent],
})
export class DialogClientAddEditModule {}
