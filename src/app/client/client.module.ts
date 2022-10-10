import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { LayoutModule } from "../shared/layout/layout.module";
import { BreadcrumbModule } from "../shared/layout/breadcrumd/breadcrumb.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AdminRoutingModule } from "../admin/admin-routing.module";
import { UserModule } from "../admin/user/user.module";
import { CartModule } from "./cart/cart.module";

@NgModule({
  // declarations: [],
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
export class ClientModule {}
