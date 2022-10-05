import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AuthenticationService } from "../../core/authentication/authentication.service";
import { ToastrService } from "ngx-toastr";
import { LoggedInUserService } from "../../core/loggedInUser/logged-in-user.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  message: string;
  loginForm!: FormGroup;
  inLoading = false;
  passwordType = "password";
  valueSpiner = 50;
  bufferValue = 75;

  agencyName = environment;

  @ViewChild("username", { static: true }) username!: ElementRef;
  @ViewChild("pass", { static: true }) pass!: ElementRef;

  constructor(
    public authService: AuthenticationService,
    // private toastr: ToastrService,
    // private showToastrService: ShowToastrService,
    private router: Router,
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService
  ) {
    this.message = "";
    console.log("se ejecuto esta talla");
  }

  @HostListener("keypress", ["$event"]) onKeyPress(event: { code: string }) {
    if (event.code === "Enter") {
      this.passwordType = "password";
      if (this.loginForm.controls["username"].valid) {
        this.pass.nativeElement.focus();
      }
    }
  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    this.username.nativeElement.focus();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [{ value: null, disabled: false }, [Validators.required]],
      password: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  login(username: string, password: string) {
    this.inLoading = true;
    this.authService.login(username, password).subscribe(
      (dataR) => {
        dataR.profile.token = dataR.Authorization;
        this.loggedInUserService.setLoggedInUser(dataR.profile);

        this.authService.getProfile().subscribe(
          (resData) => {
            console.log(resData, "***");
            if (this.successHandle(resData)) {
              this.router.navigate(["/admin"]).then();
            } else {
              this.authService.setLogout();
            }
            this.inLoading = false;
          },
          (error) => {
            this.inLoading = false;
          }
        );
      },
      (e) => {
        this.inLoading = false;
      }
    );

    return;
  }

  successHandle(data: { user: { token: any }; token: any }): boolean {
    console.log(data);
    data.user.token = data.token;
    this.loggedInUserService.setLoggedInUser(data.user);
    if (!this.loggedInUserService.isClient()) {
      // this.toastr.success(
      //   "Usted está logeado en nuestro sistema.",
      //   "Felicidades!",
      //   {
      //     timeOut: 4000,
      //     progressBar: true,
      //     positionClass: "toast-bottom-right",
      //   }
      // );
      this.inLoading = false;
      return true;
    } else if (this.loggedInUserService.isClient()) {
      // this.toastr.warning(
      //   "Los Cliente No tienen permisos para acceder a la administración.",
      //   "Atención!",
      //   {
      //     timeOut: 6000,
      //     progressBar: true,
      //     positionClass: "toast-bottom-right",
      //   }
      // );
      this.inLoading = false;
      return false;
    } else {
      // this.toastr.warning(
      //   "Usted No tienen permisos para acceder a la administración.",
      //   "Atención!",
      //   {
      //     timeOut: 6000,
      //     progressBar: true,
      //     positionClass: "toast-bottom-right",
      //   }
      // );
      this.inLoading = false;
      return false;
    }
  }

  errorHandle(error: { error: { message: any } }) {
    const message = error.error.message
      ? error.error.message
      : "Ha ocurrido un error.";
    // this.toastr.error(message, "Error", {
    //   timeOut: 5000,
    //   progressBar: true,
    //   positionClass: "toast-bottom-right",
    // });
    this.inLoading = false;
  }
}
