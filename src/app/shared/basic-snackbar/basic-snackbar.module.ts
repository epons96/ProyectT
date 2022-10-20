import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BasicSnackbarComponent } from "./basic-snackbar.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [BasicSnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule],
})
export class BasicSnackbarModule {}
