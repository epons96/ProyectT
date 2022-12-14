import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { AuthenticationService } from "../../../core/authentication/authentication.service";

@Component({
  selector: "app-email-forgot-pass",
  templateUrl: "./email-forgot-pass.component.html",
  styleUrls: ["./email-forgot-pass.component.scss"],
})
export class EmailForgotComponent implements OnInit {
  message: string;
  emailForm!: FormGroup;
  inLoading = false;
  passwordType = "password";
  valueSpiner = 50;
  bufferValue = 75;
  agency: any;
  logo: any;
  emailTxt = "Ingrese su email";

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private fb: FormBuilder
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

  createForm() {
    this.emailForm = this.fb.group({
      email: [
        {
          value: null,
          disabled: false,
        },
        [Validators.required, Validators.email],
      ],
    });
  }

  sendForm(): boolean {
    this.inLoading = true;
    const data = { ...this.emailForm.value };
    this.authService.passForgot(data).subscribe(
      (result: any) => {
        this.inLoading = false;
        this.router
          .navigate(["/auth/change-pass"], {
            queryParams: { email: data.email },
          })
          .then((r) => false);
      },
      () => {
        this.inLoading = false;
      }
    );
    return false;
  }
}
