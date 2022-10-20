import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BasicSnackbarModule } from "../../../shared/basic-snackbar/basic-snackbar.module";

@NgModule({
  imports: [
    RegisterRoutingModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    FlexLayoutModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    BasicSnackbarModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
