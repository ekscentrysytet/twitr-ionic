import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../shared';
import { TabsPage } from '../tabs/tabs';
import { JwtService } from '../../shared';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  signInForm: FormGroup;
  submitAttempt: boolean = false;
  errors: Object = {};

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService
  ) {
    this.authorizeUser = this.authorizeUser.bind(this);

    this.signInForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  login() {
    this.submitAttempt = true;
    this.errors = {};

    if (!this.signInForm.valid) {
      return;
    }

    this.authService
      .signIn(this.signInForm.value)
      .subscribe(
        this.authorizeUser,
        err => this.errors = err,
        () => this.submitAttempt = false
      );
  }

  register() {
    this.submitAttempt = true;
    this.errors = {};

    if (!this.signInForm.valid) {
      return;
    }

    this.authService
      .signUp(this.signInForm.value)
      .subscribe(
        this.authorizeUser,
        err => this.errors = err,
        () => this.submitAttempt = false
      );
  }

  private authorizeUser(data) {
    this.jwtService.saveToken(data.token);
    this.navCtrl.push(TabsPage);
  }
}
