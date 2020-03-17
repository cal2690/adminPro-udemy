import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/service.index';


declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public remember: boolean = false;
  public email: string;

  constructor(
    public router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    init_plugins()

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.remember = true;
    }
  }

  login(form: NgForm) {
    
    if (form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);
    this._userService.login(user, form.value.remember)
    .subscribe(result => this.router.navigate(['./dashboard']))
  }

}
