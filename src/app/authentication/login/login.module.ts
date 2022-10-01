import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    LoginRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    FlexLayoutModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
