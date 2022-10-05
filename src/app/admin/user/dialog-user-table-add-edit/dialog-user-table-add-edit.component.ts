import { Component, Inject, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { format, isValidNumber } from "libphonenumber-js";
import { ElementRef, ViewChild } from "@angular/core";
import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";
import { IUser } from "src/app/core/interfaces/user.class";
import { environment } from "src/environments/environment";
import { EMAIL_REGEX, PHONE_REGEX } from "src/app/core/const/const.pattern";
import { UserService } from "src/app/core/user/user.service";
import { UtilsService } from "src/app/core/utils/utils.service";

@Component({
  selector: "app-dialog-user-table-add-edit",
  templateUrl: "./dialog-user-table-add-edit.component.html",
  styleUrls: ["./dialog-user-table-add-edit.component.scss"],
})
export class DialogUserTableAddEditComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: IUser;
  selectedUser: IUser;
  currentUser: IUser;
  showAlertPhone = false;
  allUser: IUser[];
  form: FormGroup;
  formPass: FormGroup;
  updatePass = new FormControl(false);
  roles: any[];
  geoData: any[];
  animate_button = false;
  role = "all";

  // kike
  base64textString = null;
  isPerfil = false;
  passwordType = "password";
  selectedTitle = null;

  @ViewChild("fruitInput", { static: false })
  fruitInput: ElementRef;

  private language: "es";

  constructor(
    public dialogRef: MatDialogRef<DialogUserTableAddEditComponent>,
    // private toastr: ToastrService,
    private loggedInUserService: LoggedInUserService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    public utilsService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService // public translate: TranslateService
  ) {
    console.log(data);
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.isEditing = data.isEditing;
    this.role = data.role;
    this.isPerfil = data.isPerfil;
    this.selectedUser = data.user;
    this.currentUser = !data.user ? { id: null, description: null } : data.user;
    this.allUser = data.allUser;
    this.selectedTitle = data.selectedTitle;

    if (this.loggedInUser.role) {
      if (this.role === "admin") {
        this.roles = [
          { id: "admin", name: "Admin" },
          { id: "client", name: "Cliente" },
        ];
      } else if (this.role === "client") {
        this.roles = [{ id: "client", name: "Cliente" }];
      } else if (this.role === "any") {
        this.roles = [
          { id: "admin", name: "Admin" },
          { id: "client", name: "Cliente" },
        ];
      }
    }
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.buildAdminForm();

    this.form.controls.role.valueChanges.subscribe((data) => {
      if (data === "admin") {
        this.form.controls.canCreateClients.setValue(true);
        this.form.controls.canCreateUsers.setValue(true);
        this.form.updateValueAndValidity();
      }
    });
  }

  matchValidator(group: FormGroup) {
    const pass = group.controls["password"].value;
    const repeat = group.controls["repeat"].value;
    if (pass === repeat) {
      return null;
    }
    return {
      mismatch: true,
    };
  }

  buildAdminForm() {
    if (this.isEditing) {
      this.formPass = this.fb.group(
        {
          password: [null, []],
          repeat: [null, []],
        },
        { validator: this.matchValidator.bind(this) }
      );
      this.form = this.fb.group({
        name: [this.selectedUser.name, [Validators.required]], // all
        lastname: [this.selectedUser.lastname, [Validators.required]], // all
        phone: [this.selectedUser.phone, [Validators.pattern(PHONE_REGEX)]], // all
        // phone: [this.selectedUser.phone, [this.phoneValidator.bind(this)]],
        email: [
          this.selectedUser.email,
          [
            Validators.required,
            Validators.email,
            Validators.pattern(EMAIL_REGEX),
          ],
        ], // all
        role: [this.selectedUser.role, [Validators.required]], // Admin y superAdmin
        username: [this.selectedUser.username, [Validators.required]], // all
        passwords: this.formPass,
      });
    } else {
      this.formPass = this.fb.group(
        {
          password: [null],
          repeat: [null],
        },
        { validator: this.matchValidator.bind(this) }
      );

      this.form = this.fb.group({
        name: [null, [Validators.required]], // all
        lastname: [null, [Validators.required]], // all
        phone: [
          null,
          [this.phoneValidator.bind(this), Validators.pattern(PHONE_REGEX)],
        ], // [null, [this.phoneValidator.bind(this)]], // all
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.pattern(EMAIL_REGEX),
          ],
        ], // all
        description: [null, []], // all
        role: [this.role, [Validators.required]], // Admin y superAdmin
        username: [null, [Validators.required]], // all
        passwords: this.formPass,
      });
    }

    this.form.markAsDirty();
    this.form.markAllAsTouched();

    this.updatePass.valueChanges.subscribe((data) => {
      if (data) {
        this.formPass.get("password").setValidators([Validators.required]);
        this.formPass.get("password").updateValueAndValidity();
        this.formPass.get("repeat").setValidators([Validators.required]);
        this.formPass.get("repeat").updateValueAndValidity();
      } else {
        this.formPass.get("password").setValue(null);
        this.formPass.get("repeat").setValue(null);
        this.formPass.get("password").setValidators([]);
        this.formPass.get("password").updateValueAndValidity();
        this.formPass.get("repeat").setValidators([]);
        this.formPass.get("repeat").updateValueAndValidity();
      }
      this.form.updateValueAndValidity();
    });
  }

  onEditUser() {
    if (this.form.invalid) {
      return false;
    }

    let newData: IUser;
    this.animate_button = true;

    newData = this.form.value;

    if (this.currentUser?.id) {
      newData = this.form.value;
      newData.id = this.currentUser.id;

      // if (newData.role === 'admin') {
      newData.password = this.form.value.passwords.password;
      // } else if (newData.role === 'client') {
      //   newData.password = this.form.value.passwords.password;
      // } else if (newData.role === 'supervisor') {
      //   newData.password = this.form.value.passwords.password;
      // }

      if (this.loggedInUser.role === "superadmin") {
        newData.role = this.currentUser.role;
      }

      if (this.loggedInUser.id === this.currentUser.id) {
        for (const key in newData) {
          if (key && key.startsWith("can")) {
            delete newData[key];
          }
        }
      }

      if (
        !newData.password ||
        newData.password === " " ||
        newData.password === ""
      ) {
        delete newData.password;
      }

      this.userService.editUser(newData).subscribe(
        (data) => {
          this.animate_button = false;
          if (this.loggedInUser.id === data.id) {
            this.loggedInUserService.updateUserProfile(data);
          }
          this.dialogRef.close(true);
          // this.toastr.success(
          //   "El Usuario ha sido modificado con éxito.",
          //   "Felicidades!",
          //   {
          //     timeOut: 2000,
          //     progressBar: true,
          //     positionClass: "toast-bottom-right",
          //   }
          // );
        },
        (error) => {
          this.animate_button = false;
        }
      );
    }

    if (!this.currentUser?.id) {
      newData = this.form.value;
      if (newData.role === "admin" || newData.role === "supervisor") {
        newData.password = this.form.value.passwords.password;
      } else {
        // newData.password = 'cliente';
        newData.password = this.form.value.passwords.password;
      }

      this.userService.addUser(newData).subscribe(
        (data) => {
          this.animate_button = false;
          this.dialogRef.close(true);

          // this.toastr.success(
          //   "El Usuario ha sido creada con éxito.",
          //   "Felicidades!",
          //   {
          //     timeOut: 2000,
          //     progressBar: true,
          //     positionClass: "toast-bottom-right",
          //   }
          // );
          return true;
        },
        (error) => {
          this.animate_button = false;
          this.utilsService.errorHandle(error);
        }
      );
    }
  }

  onSelectRol() {
    if (this.form.controls["role"].value !== "admin") {
      if (!this.isEditing) {
        this.formPass = this.fb.group(
          {
            password: [null, Validators.required],
            repeat: [null, Validators.required],
          },
          { validator: this.matchValidator.bind(this) }
        );
        this.form = this.fb.group({
          name: [this.form.controls["name"].value, [Validators.required]], // all
          lastname: [
            this.form.controls["lastname"].value,
            [Validators.required],
          ], // all
          phone: [
            this.form.controls["phone"].value,
            [this.phoneValidator.bind(this), Validators.pattern(PHONE_REGEX)],
          ], // all
          email: [
            this.form.controls["email"].value,
            [
              Validators.required,
              Validators.email,
              Validators.pattern(EMAIL_REGEX),
            ],
          ], // all
          description: [null, []], // all
          role: [this.form.controls["role"].value, [Validators.required]],
          username: [], // all
          passwords: this.formPass,
        });
      }
    } else {
      if (!this.isEditing) {
        this.formPass = this.fb.group(
          {
            password: [null, Validators.required],
            repeat: [null, Validators.required],
          },
          { validator: this.matchValidator.bind(this) }
        );
        this.form = this.fb.group({
          name: [this.form.controls["name"].value, [Validators.required]], // all
          lastname: [
            this.form.controls["lastname"].value,
            [Validators.required],
          ], // all
          phone: [
            this.form.controls["phone"].value,
            [this.phoneValidator.bind(this), Validators.pattern(PHONE_REGEX)],
          ], // all
          email: [
            this.form.controls["email"].value,
            [
              Validators.required,
              Validators.email,
              Validators.pattern(EMAIL_REGEX),
            ],
          ], // all
          description: [null, []], // all
          role: [this.form.controls["role"].value, [Validators.required]],
          username: [null, [Validators.required]], // all
          passwords: this.formPass,
        });
      }
    }
  }

  validatePhone(phone) {
    if (
      isValidNumber(phone) ||
      isValidNumber(phone, "CU") ||
      isValidNumber(phone, "US")
    ) {
      if (!this.utilsService.validatePhone(phone)) {
        this.showAlertPhone = true;
      } else {
        this.showAlertPhone = false;
      }
    } else {
      this.showAlertPhone = false;
    }
  }

  // formatPhone(phone) {
  //   if (isValidNumber(phone) || isValidNumber(phone, 'CU') || isValidNumber(phone, 'US')) {
  //     if (!this.utilsService.validatePhone(phone)) {
  //       if (isValidNumber(phone, 'CU')) {
  //         this.form.controls['phone'].setValue(format(this.form.controls['phone'].value, 'CU', 'NATIONAL'));
  //       }
  //       if (isValidNumber(phone, 'US')) {
  //         this.form.controls['phone'].setValue(format(this.form.controls['phone'].value, 'US', 'NATIONAL'));
  //       }
  //     } else {
  //       this.showAlertPhone = false;
  //     }
  //   } else {
  //     this.showAlertPhone = false;
  //   }
  // }

  onChangeType() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
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
