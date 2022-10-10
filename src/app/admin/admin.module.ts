import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { AdminRoutingModule } from "./admin-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserModule } from "./user/user.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { LayoutModule } from "../shared/layout/layout.module";
import { BreadcrumbModule } from "../shared/layout/breadcrumd/breadcrumb.module";

@NgModule({
  // declarations: [LayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    // BreadcrumbModule,
    LayoutModule,
    UserModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule,
    MatExpansionModule,
    MatListModule,
    MatDatepickerModule,
    MatRadioModule,
    BreadcrumbModule,
  ],
})
export class AdminModule {}
