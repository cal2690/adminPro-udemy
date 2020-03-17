import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private _userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins()

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      passwordV: new FormControl(null, Validators.required),
      condition: new FormControl(false)
    }, {validators: this.validEqual('password', 'passwordV') });

    this.form.setValue({
      name: 'Test',
      email: 'test1@gmail.com',
      password: '123456',
      passwordV: '123456',
      condition: true
    })
  }

  validEqual(value1: string, value2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[value1].value;
      let pass2 = group.controls[value2].value;
      if(pass1 == pass2) {
        return null;
      }
      return {
        validEqual: true
      }
    }
  }

  registerUser() {
    if (this.form.invalid) {
      return;
    }
    
    if (!this.form.value.condition) {
      alert('IMPORTANTE! Debe de aceptar las condiciones');
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this._userService.saveUser(user).subscribe(result => this.router.navigate(['/login']))
  }
}
