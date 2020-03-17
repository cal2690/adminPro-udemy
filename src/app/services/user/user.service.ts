import { Injectable, ɵConsole } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { URL_SERVICE } from 'src/app/config/config';


@Injectable()
export class UserService {

  public user: User;
  public token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.loadStorage();
  }

  logged() {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      console.log(this.token);
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  login (user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICE + '/login';
    return this.http.post(url, user)
    .map((result: any) => {
      localStorage.setItem('id', result.id);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.result));
      return true;
    })
  }

  saveUser(user: User) {
    let url = URL_SERVICE + '/user';
    return this.http.post(url, user).map( (result: any) => {
      alert('Usuario creado');
      return result.user;
    });
  }
  
  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

}
