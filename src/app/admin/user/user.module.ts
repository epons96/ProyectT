import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserRoutingModule } from "./user-routing.module";
// import { UserHomeComponent } from "./user-home/user-home.component";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
// import { MatPaginatorIntlSpanish } from '../core/classes/translate-pagination.class';
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
// import { UserLayoutComponent } from "./user-layout/user-layout.component";
// import { ClientHomeComponent } from './client-home/client-home.component';

// //////// --------MATERIAL MODULES------- /////////////////////////
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { MatRadioModule } from "@angular/material/radio";
import { MatCardModule } from "@angular/material/card";
// import { UsersMyAgenciesTableComponent } from "./users-my-agencies-table/users-my-agencies-table.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatSortModule } from "@angular/material/sort";
import { ConfirmationDialogModule } from "../../shared/confirmation-dialog/confirmation-dialog.module";
import { DialogClientAddEditModule } from "../dialog-client-add-edit/dialog-client-add-edit.module";
import { DialogUserTableAddEditModule } from "../user/dialog-user-table-add-edit/dialog-user-table-add-edit.module";
import { UserLayoutComponent } from "./user-layout/user-layout.component";
import { UserHomeComponent } from "./user-home/user-home.component";
import { NgpImagePickerModule } from "ngp-image-picker";
import { BasicSnackbarModule } from "../../shared/basic-snackbar/basic-snackbar.module";
// //////////////////////////////////////////////////////////////

registerLocaleData(localeEs, "es");

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatBadgeModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatRadioModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    ConfirmationDialogModule,
    DialogClientAddEditModule,
    ConfirmationDialogModule,
    DialogUserTableAddEditModule,
    NgpImagePickerModule,
    BasicSnackbarModule,
  ],
  declarations: [UserHomeComponent, UserLayoutComponent],
  providers: [{ provide: MatPaginatorIntl }],
  // exports: [ClientHomeComponent],
})
export class UserModule {}
