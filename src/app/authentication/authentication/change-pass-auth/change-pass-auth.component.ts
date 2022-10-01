import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { LoggedInUserService } from '../../../core/loggedInUser/logged-in-user.service';
import { ShowToastrService } from '../../../core/show-toastr/show-toastr.service';

@Component({
  selector: 'app-change-pass-auth',
  templateUrl: './change-pass-auth.component.html',
  styleUrls: ['./change-pass-auth.component.scss'],
})
export class ChangePassAuthComponent implements OnInit {
  innerWidth: any;
  passType = 'password';
  passType2 = 'password';
  applyStyle = false;
  configuration: any = {};
  message!: string;
  inLoading = false;
  form!: FormGroup;
  fromPass!: FormGroup;
  language = null;
  // logoLoading = environment.logoLoading;
  agencyName = environment;

  agency: any;
  logo: any;

  valueSpiner = 50;
  bufferValue = 75;
  queryParams: Params;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.applyStyle = this.innerWidth <= 600;
  }

  constructor(
    public authService: AuthenticationService,
    private showToastr: ShowToastrService,
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.queryParams = this.route.snapshot.queryParams;

    this.agency = localStorage.getItem('agency');
    if (this.agency) {
      this.agency = JSON.parse(this.agency);
      this.logo = this.agency.image ? environment + this.agency.image : null;
    }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.fromPass = this.fb.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],
        repeat: [null, [Validators.required, Validators.minLength(6)]],
      },
      { validator: this.matchValidator.bind(this) }
    );

    this.form = this.fb.group({
      pin: [this.queryParams['pin'], [Validators.required]],
      email: [this.queryParams['email']],
      passwords: this.fromPass,
    });
  }

  onSubmit() {
    this.inLoading = true;
    const data = JSON.parse(JSON.stringify(this.form.value));
    data.password = data.passwords.password + '';
    data.repeatPassword = data.passwords.repeat + '';
    data.username = data.email;
    delete data.passwords;
    this.authService.changePass(data).subscribe(
      () => {
        this.inLoading = false;

        this.showToastr.showSucces('Password changed correctly', 'OK');
        this.router
          .navigate([''], {
            queryParams: { username: data.email },
          })
          .then((r) => false);
      },
      (error) => {
        this.inLoading = false;
      }
    );
  }

  matchValidator(group: FormGroup) {
    const pass = group.controls['password'].value;
    const repeat = group.controls['repeat'].value;
    if (pass === repeat) {
      return null;
    }
    return {
      mismatch: true,
    };
  }

  showPass() {
    if (this.passType === 'password') {
      this.passType = 'text';
    } else {
      this.passType = 'password';
    }
  }

  showPass2() {
    if (this.passType2 === 'password') {
      this.passType2 = 'text';
    } else {
      this.passType2 = 'password';
    }
  }
}
