import { NgModule } from "@angular/core";
import { DialogUserTableAddEditComponent } from "./dialog-user-table-add-edit.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { NgpImagePickerModule } from "ngp-image-picker";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
// import {GuachosImagePickerModule} from 'guachos-image-picker';

@NgModule({
  imports: [
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    NgpImagePickerModule,
    ReactiveFormsModule,
    FormsModule,
    // GuachosImagePickerModule,
  ],
  declarations: [DialogUserTableAddEditComponent],
  exports: [DialogUserTableAddEditComponent],
})
export class DialogUserTableAddEditModule {}
