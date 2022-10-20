import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AuthenticationService } from "../../core/authentication/authentication.service";
// import { ToastrService } from "ngx-toastr";
import { LoggedInUserService } from "../../core/loggedInUser/logged-in-user.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private loggedInUserService: LoggedInUserService,
    private _snackBar: MatSnackBar
  ) {
    this.message = "";
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
      (res) => {
        console.log(res);
        this.loggedInUserService.setLoggedInUser(res);
        if (this.loggedInUserService.isAdmin()) {
          console.log("es admin");
          this._snackBar.open("Bienvenido", "", {
            duration: 2000,
            panelClass: "success-snackbar",
          });
          this.router.navigate(["/admin"]).then();
        } else if (this.loggedInUserService.isClient()) {
          this._snackBar.open("Bienvenido a la tienda ABC", "", {
            duration: 2000,
            panelClass: "success-snackbar",
          });
          this.router.navigate(["/client/products"]).then();
        } else {
          this._snackBar.open("CREDENCIALES INCORRECTAS", "", {
            duration: 2000,
            panelClass: "error-snackbar",
          });
          this.authService.setLogout();
        }
        this.inLoading = false;
      },
      (error) => {
        this._snackBar.open("CREDENCIALES INCORRECTAS", "", {
          duration: 2000,
          panelClass: "error-snackbar",
        });
        this.inLoading = false;
      }
    );
    return;
  }
}
