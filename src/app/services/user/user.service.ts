import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { URL_SERVICE } from 'src/app/config/config';
import { UploadFileService } from '../upload-file/upload-file.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  public user: User;
  public token: string;
  public menu: any = [];


  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFile: UploadFileService
  ) { 
    this.loadStorage();
  }

  logged() {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
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
      console.log(result);
      this.saveStorage(result.id, result.token, result.result, result.menu);
      return true;
    })
    .catch(err => {
      alert(err.error.message);
      return Observable.throw(err);
    })
  }

  saveUser(user: User) {
    let url = URL_SERVICE + '/user';
    return this.http.post(url, user)
    .map( (result: any) => {
      alert('Usuario creado');
      return result.user;
    })
    .catch(err => {
      alert(err.error.message);
      return Observable.throw(err);
    })
  }

  updateUser(user: User) {
    let url = URL_SERVICE + '/user/' + user._id;
    url+= '?token=' + this.token;
    return this.http.put(url, user)
    .map((result: any) => {
      if(user._id === this.user._id) {
        this.saveStorage(result.resultSave._id, this.token, result.resultSave, result.menu);
      }
      
      alert('Usuario actualizado');
      return true;
    })
  }
  
  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];
    

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  changeFile(file: File, id: string) {

    this._uploadFile.uploadFile(file, 'users', id)
    .then((result: any) => {
      this.user.image = result.resultUpload.image;
      alert('Imagen actualizada');
      this.saveStorage(id, this.token, result.resultUpload, this.menu);
    })
    .catch(result => {
      console.log(result);
    })
  }

  readUser(from: number = 0) {
    let url = URL_SERVICE + '/user?from=' + from;
    return this.http.get(url);
  }

  searchUser(term: string) {
    let url = URL_SERVICE + '/search/collection/user/' + term;
    return this.http.get(url)
    .map((result: any) => result.result);
  }

  deleteUser(id: string) {
    let url = URL_SERVICE + '/user/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
    .map(result => {
      alert('Usuario borrado');
      return true;
    });
  }
}
