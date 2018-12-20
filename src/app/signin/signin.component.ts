import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

@NgModule({
  imports:
  [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],
  providers: [AlertService, LoginService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  submitted = false;
  returnUrl = '/dashboard';
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private loginService: LoginService,
              private authenticationService: AuthenticationService,
              private router: Router) {
                console.log('signin constructor');
               }

  ngOnInit() {
    console.log('signin ngoninit');
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      hostname: ['', Validators.required]
  });

  // reset login status
  this.authenticationService.logout();
  this.loginService.setLoggedInUser(false, '', '');
  
  // get return url from route parameters or default to '/'
  //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.signinForm.controls; }

  public getUserLoggedIn(): boolean
  {
    return this.loginService.getUserLoggedIn();
  }

  login(): void {
    console.log('login : ' + this.f.username.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.signinForm.invalid) {
        console.log('form is invalid');
      //  return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log('got login data : ' + data);
                console.log(' routingUrl : ' + this.returnUrl);
                this.loginService.setLoggedInUser(true, this.f.username.value, this.f.hostname.value);
                this.router.navigateByUrl(this.returnUrl);
                console.log(' navigate done ');
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
}
