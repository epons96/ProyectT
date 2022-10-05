import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";

import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/core/user/user.service";
import { format, isValidNumber } from "libphonenumber-js";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { UtilsService } from "src/app/core/utils/utils.service";
import { environment } from "src/environments/environment";
import { IUser } from "src/app/core/interfaces/user.class";

@Component({
  selector: "app-dialog-client-add-edit",
  templateUrl: "./dialog-client-add-edit.component.html",
  styleUrls: ["./dialog-client-add-edit.component.scss"],
})
export class DialogClientAddEditComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: IUser;
  selectedClient: any = null;
  showAlertPhone = false;
  form: FormGroup;
  animate_button = false;

  loadImage = false;
  showErrorImage = false;
  urlImage = "url(data:image/jpeg;base64,";
  base64textString = null;
  imageAvatar = null;
  avatarChange = false;
  maxDate = new Date();

  visible = true;
  selectable = true;
  isExternal = false;
  ExternalUserId = undefined;

  generalDisplayOptions = {
    firthLabel: [
      {
        type: "path",
        path: ["name"],
      },
    ],
  };

  allFruits: string[] = [];

  public initialImage: any;
  public imagePickerConf: any;
  private language: any;

  constructor(
    public dialogRef: MatDialogRef<DialogClientAddEditComponent>,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
    // private urlImageService: UrlImageService,
    private utilsService: UtilsService,
    private showToastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    public translate: TranslateService
  ) {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.isEditing = data.isEditing;
    this.isExternal = data.isExternal || false;
    this.ExternalUserId = data.ExternalUserId || undefined;

    if (data.selectedClient) {
      this.selectedClient = data.selectedClient;
      console.log(this.selectedClient);
    }
    this.imagePickerConf = {
      borderRadius: "50%",
      language: this.language,
      width: "144px",
      height: "144px",
    };

    if (this.selectedClient && this.selectedClient.image) {
      this.loadImage = true;
      this.initialImage = environment + this.selectedClient.image;
      this.imageAvatar = "url(" + this.initialImage + ")";
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    if (this.isEditing) {
      this.form = this.fb.group({
        name: [this.selectedClient.name, [Validators.required]], // all
        lastname: [this.selectedClient.lastname, [Validators.required]], // all
        phone: [this.selectedClient.phone, [this.phoneValidator.bind(this)]], // all
        email: [this.selectedClient.email, [Validators.email]], // all
      });
    } else {
      this.form = this.fb.group({
        name: [null, [Validators.required]], // all
        lastname: [null, [Validators.required]], // all
        phone: [null, [this.phoneValidator.bind(this)]], // all
        email: [null, [Validators.email]], // all
      });
    }

    this.form.markAsDirty();
    this.form.markAllAsTouched();
  }

  onEditUser() {
    let newData: any;
    this.animate_button = true;

    if (this.selectedClient) {
      newData = this.form.value;
      newData.isExternal = this.isExternal;
      newData.ExternalUserId = +this.ExternalUserId;
      newData.id = this.selectedClient.id;
      if (!newData.AgencyId) {
        newData.AgencyId = this.loggedInUser;
      }

      if (this.avatarChange && this.base64textString) {
        newData.image = this.base64textString;
        // newData.image = 'data:image/jpeg;base64,' + this.base64textString;
      }

      this.userService.editClient(newData).subscribe(
        (data) => {
          this.animate_button = false;
          this.showToastr.success(
            "El cliente ha sido modificado con éxito.",
            "Felicidades!"
          );

          this.dialogRef.close(data);
        },
        (error) => {
          this.animate_button = false;
          const message = error.error.message
            ? error.error.message
            : "Ha ocurrido un error.";
          this.showToastr.error(message, "Error");
          this.dialogRef.close(false);
        }
      );
    } else {
      newData = this.form.value;
      newData.isExternal = this.isExternal;
      newData.ExternalUserId = this.ExternalUserId;
      newData.AgencyId = this.loggedInUser;

      if (this.loadImage && this.base64textString) {
        newData.image = this.base64textString;
      } else {
        newData.image = null;
      }
      this.userService.addClient(newData).subscribe(
        (data) => {
          this.animate_button = false;
          this.showToastr.success(
            "El cliente ha sido creado con éxito.",
            "Felicidades!"
          );

          this.dialogRef.close(data);
        },
        (error) => {
          this.animate_button = false;
          const message = error.error.message
            ? error.error.message
            : "Ha ocurrido un error.";
          this.showToastr.error(message, "Error");
          this.dialogRef.close(false);
        }
      );
    }
  }

  onImage(value: string) {
    if (this.isEditing) {
      this.loadImage = true;
      this.avatarChange = true;
      this.showErrorImage = false;
    }
    this.base64textString = value;
    this.loadImage = true;
    this.showErrorImage = false;
  }

  validatePhone(phone) {
    if (
      isValidNumber(phone) ||
      isValidNumber(phone, "CU") ||
      isValidNumber(phone, "US")
    ) {
      this.showAlertPhone = !this.utilsService.validatePhone(phone);
    } else {
      this.showAlertPhone = false;
    }
  }

  formatPhone(phone) {
    if (
      isValidNumber(phone) ||
      isValidNumber(phone, "CU") ||
      isValidNumber(phone, "US")
    ) {
      if (!this.utilsService.validatePhone(phone)) {
        if (isValidNumber(phone, "CU")) {
          this.form.controls["phone"].setValue(
            format(this.form.controls["phone"].value, "CU", "NATIONAL")
          );
        }
        if (isValidNumber(phone, "US")) {
          this.form.controls["phone"].setValue(
            format(this.form.controls["phone"].value, "US", "NATIONAL")
          );
        }
      } else {
        this.showAlertPhone = false;
      }
    } else {
      this.showAlertPhone = false;
    }
  }

  phoneValidator(control: FormControl) {
    const phone = control.value;
    if (control.value) {
      if (
        isValidNumber(phone) ||
        isValidNumber(phone, "CU") ||
        isValidNumber(phone, "US")
      ) {
        return null;
      }
      return {
        invalidCellphone: true,
      };
    }
  }
}
