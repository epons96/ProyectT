import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { AuthenticationService } from "../../../core/authentication/authentication.service";
import { UtilsService } from "../../../core/utils/utils.service";
import { EMAIL_REGEX } from "src/app/core/const/const.pattern";
import { MatSnackBar } from "@angular/material/snack-bar";
// import { NgxSpinnerService } from "ngx-spinner";
// import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  message: string;
  emailForm!: FormGroup;
  inLoading = false;
  passwordType = "password";
  valueSpiner = 50;
  bufferValue = 75;
  agency: any;
  logo: any;
  emailTxt = "Ingrese su email";
  public form: FormGroup;
  public formPass: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    public utilService: UtilsService,
    private _snackBar: MatSnackBar // public spinner: NgxSpinnerService // private showToastr: ToastrService
  ) {
    this.message = "";
    this.agency = localStorage.getItem("agency");
    if (this.agency) {
      this.agency = JSON.parse(this.agency);
      this.logo = this.agency.image ? environment + this.agency.image : null;
    }
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.formPass = this.fb.group(
      {
        password: [null, Validators.required],
        repeat: [null, Validators.required],
      },
      { validator: RegisterComponent.matchValidator.bind(this) }
    );

    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(25)]],
      lastName: [null, [Validators.required, Validators.maxLength(25)]],
      email: [null, [Validators.pattern(EMAIL_REGEX), Validators.required]],
      passwords: this.formPass,
    });

    this.form.get("email").valueChanges.subscribe((email) => {
      const d = email.replaceAll(" ", "");
      if (email !== d) {
        this.form.get("email").setValue(d);
      }
    });
  }

  private static matchValidator(group: FormGroup) {
    const pass = group.controls.password.value;
    const repeat = group.controls.repeat.value;
    if (pass === repeat) {
      return null;
    }
    return {
      mismatch: true,
    };
  }

  public singUp(): void {
    if (this.form.valid) {
      // this.spinner.show().then();
      localStorage.removeItem("user");
      const data = this.form.value;
      data.username = data.email;
      data.password = data.passwords.password;
      data.role = "client";
      // data.url = this.redirect;
      this.inLoading = true;
      this.authService.signUp(data).subscribe(
        (data) => {
          this._snackBar.open("Se ha registrado correctamente", "", {
            duration: 2000,
            panelClass: "success-snackbar",
          });
          this.inLoading = false;
        },
        () => {
          this._snackBar.open("Usuario ya existente", "", {
            duration: 2000,
            panelClass: "error-snackbar",
          });
          this.inLoading = false;
          // this.spinner.hide().then();
        }
      );
    }
  }
}
